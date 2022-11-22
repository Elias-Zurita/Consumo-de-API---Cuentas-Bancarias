const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // utilizacion de fetch

module.exports = {
    list: async (req, res) =>{
        fetch('https://api.npoint.io/97d89162575a9d816661') // Api de cuentas
            .then(response => response.json())
            .then(cuentasControllerApi => {
                return res.json(cuentasControllerApi);
            })
    },
}

