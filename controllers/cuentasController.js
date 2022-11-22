const { json } = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // utilizacion de fetch

module.exports = {          
    list: async (req, res) =>{
        fetch('https://api.npoint.io/97d89162575a9d816661') // Api de cuentas
            .then(response => response.json()) // Procesa la respuesta en formato JSON
            .then(data => { // Informacion de cuentas
                let self = 1 // Pagina 1
                if(req.query.page) { // si no existe la pagina
                    console.log(req.query.page)
                    self = Number(req.query.page) 
                }

                let cuentasValidas = data.cuentas.filter(cuenta => cuenta.tipo_letras.toUpperCase() == "CA" || cuenta.tipo_letras.toUpperCase() == "CC") // toUpperCase pone todo en mayusculas
                cuentasValidas = cuentasValidas.filter(cuenta => cuenta.moneda.toUpperCase() == "$" || cuenta.moneda.toUpperCase() == "U$S") // toUpperCase pone todo en mayusculas
                let next = 0  // para utilizar en botones
                let prev = 0  // para utilizar en botones
                if(self == 1 && cuentasValidas.length > 6) { // Si en la pagina 1 (self=1) hay mas de 6 cuentas
                    next = self + 1  // suma una a la variable next (boton)
                    cuentasValidas = cuentasValidas.slice(0, 5)  // Slice genera un array de la cuenta 0 a la 5

                } else if(self > 1)	{ // si estoy en una pagina mayor a la 1
                    let totalElment = cuentasValidas.slice(5, -1).length  // cuenta desde la cuenta 5 hasta la ultima
                    prev = self - 1 // como es mayor self a 1 puedo accionar el boton prev (vuelve una pagina atras)
                    let totalPage = totalElment / 4 // debe mostrar 4 cuentas para los dos botones 
                    if(totalElment % 4 != 0 ) {
                        totalPage = totalPage + 1 // sumo una pagina mas
                    }
                    if(totalPage > self + 1) {
                        next = self + 1
                    }
                    let inf = 5 + ((self - 2) * 4) // calcula la cantidad de cuentas que va a mostrar a partir de la pagina 2 arrancando en indice 5
                    let sub = 9 + ((self - 2) * 4) 
                    console.log(inf, sub)
                    cuentasValidas = cuentasValidas.slice(inf, sub)
                }
                return res.render("cuentasList", {cuentas: cuentasValidas, self: self, next: next, prev: prev}); // Renderiza la vista de 'cuentasList' pasandole {cuentas desde la Api}
            })


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
