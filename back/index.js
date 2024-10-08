const express = require('express')
//Activamos cors
const cors = require("cors")

const app = express()

//invocamos el metodo constructor de la clase express
app.use(cors())

/* let permitidas = {
    origin: "http:"
} */
app.use(express.json()) //serializar los request y response

app.use(require('./src/aprendiz.js'))

app.listen(4100, () =>{
    console.log(`API REST encendida en el puerto 4100`)
})

//Principio de diseño SRP