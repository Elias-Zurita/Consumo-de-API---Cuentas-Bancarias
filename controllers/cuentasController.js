const { json } = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // utilizacion de fetch

module.exports = {
   
    list: async (req, res) =>{
        fetch('https://api.npoint.io/97d89162575a9d816661') // Api de cuentas
            .then(response => response.json()) // Procesa la respuesta en formato JSON
            .then(data => { // Informacion de cuentas
                let cuentasValidas = data.cuentas.filter(cuenta => cuenta.tipo_letras.toUpperCase() == "CA" || cuenta.tipo_letras.toUpperCase() == "CC") // toUpperCase pone todo en mayusculas
                cuentasValidas = cuentasValidas.filter(cuenta => cuenta.moneda.toUpperCase() == "$" || cuenta.moneda.toUpperCase() == "U$S") // toUpperCase pone todo en mayusculas
                return res.render("cuentasList", {cuentas: cuentasValidas}); // Renderiza la vista de 'cuentasList' pasandole {cuentas desde la Api}
            })
    
    
    /*
    list: async (req, res) =>{
        fetch('https://api.npoint.io/97d89162575a9d816661') // Api de cuentas
            .then(response => response.json()) // Procesa la respuesta en formato JSON
            .then(data => { // Informacion de cuentas
                let self = 1 // Pagina 1
                if(req.query.page) { // si existe la pagina
                    self = req.query.page
                }

                let cuentasValidas = data.cuentas.filter(cuenta => cuenta.tipo_letras.toUpperCase() == "CA" || cuenta.tipo_letras.toUpperCase() == "CC") // toUpperCase pone todo en mayusculas
                cuentasValidas = cuentasValidas.filter(cuenta => cuenta.moneda.toUpperCase() == "$" || cuenta.moneda.toUpperCase() == "U$S") // toUpperCase pone todo en mayusculas
                let totalPage = 1 // Minimo tiene una pagina
                if(cuentasValidas.length > 6) { // si tengo mas de 6 cuentas 
                    totalPage = cuentasValidas.length / 5 // Divide por 5 
                    if(cuentasValidas.length % 5 !== 0) {
                        totalPage = totalPage + 1
                    }
                }
                let next = totalPage + 1
                if(next > totalPage) {
                    next = 0
                }
                let prev = self - 1
                if(prev < 1) {
                    prev = 0
                }
                return res.render("cuentasList", {cuentas: cuentasValidas, self: self, next: next, prev: prev}); // Renderiza la vista de 'cuentasList' pasandole {cuentas desde la Api}
            })
    */
    },
    detalle: async(req, res) => {
        fetch('https://api.npoint.io/97d89162575a9d816661')
        .then(response => response.json())
        .then(data => {
            let index = data.cuentas.findIndex(cuenta => cuenta.n == req.params.id) // El findIndex si devuelve -1 significa que no existe una cuenta con la que estas buscando
            console.log(index)
            console.log(req.params.id)
            console.log(data.cuentas[0].n)
            console.log(data.cuentas[0].n == req.params.id) 
            if(index !== -1) {  // Pregunto si existe o no lo que estoy buscando
                
                return res.render ("cuentaDetalle", {cuenta: data.cuentas[index]}) // devuelvo la cuenta que encontre
            } else { 
                return res.render ("cuentaDetalle", {cuenta:{}}) ; // devuelvo el objeto vacio porque siempre tiene que devolver algo en el controlador.
            }
        })
    }
}
