//conexion a base de gatos
//instanciar la libreria mysql

const mysql = require('mysql2') //la razon por la cual se uda const por el principio de inmutabilidad

//cadena de conexion

const cnx = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'senita',
});

/* cnx.query("SELECT * FROM aprendiz", (err, results) =>{
  console.log(results)
})  */

cnx.connect((error)=>{
    if (error) {
        console.log(`Error en la conexión \n ${error}`)
    }else{
        console.log('conexion exitosa')
    }
})

module.exports = cnx