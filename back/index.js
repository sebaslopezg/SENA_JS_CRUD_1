//instancia express : sierve para api rest 

const express = require('express')

const cors = require("cors")

//instanciamos la conexion a la bd

const bd = require('./src/bd.js')

const app = express() //invocamos el metodo constructor de la clase express
app.use(cors())
app.use(express.json()) //serializar los request y response



//RUTAS


app.get("/", (req, res) =>{
    res.status(404).send({
        status:404,
        message:"ruta no encntrada"
    })
})

app.get('/welcome', (req, res)=>{
    res.status(200).send({
        mensaje: "Bienvenidos al himalaya",
        status: "OK",
        codigo: 200
    })
})



//rutas para consultar bases de datos
app.get("/listartodos", (req, res) =>{
    let consulta = "SELECT * FROM aprendiz order by apellido asc"
    bd.query(consulta, (error, data) =>{
        if (!error) {
            res.status(200).send({
                status:"OK",
                mensaje: "Consulta exitosa",
                datos: data
            })
        }else{
            res.status(400).send({
                status:"error",
                mensaje: "Error al intentar ejecutar la consulta",
                error: error
            })
        }
    })
})

app.listen(4100, () =>{
    console.log(`API REST encendida en el puerto 4100`)
})