
//instancia express : sierve para api rest 
const express = require('express')
const aprendiz = express() 
const bd = require('./bd.js')

//rutas para consultar bases de datos
aprendiz.get("/api/aprendiz/listartodos", (req, res) =>{
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

//rutas para consultar bases de datos por id
aprendiz.get("/api/aprendiz/listarporid/:id", (req, res) =>{
    //recibimos el parametro
    let id = req.params.id //express : request :params extrae parametro de la peticion = id
    let consulta = 'SELECT * FROM aprendiz WHERE id = ?'
    
    bd.query(consulta, [id], (error, data) =>{
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

//rutas para consultar bases de datos por apellido
aprendiz.get("/api/aprendiz/listarporapellido/:apellido", (req, res) =>{
    //recibimos el parametro
    let apellido = req.params.apellido //express : request :params extrae parametro de la peticion = id
    let consulta = 'SELECT * FROM aprendiz WHERE apellido = ?'
    
    bd.query(consulta, [apellido], (error, data) =>{
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

//Eliminar por ID
aprendiz.delete("/api/aprendiz/borrarporid/:id", (req, res) =>{
    //recibimos el parametro
    let id = req.params.id //express : request :params extrae parametro de la peticion = id
    let consulta = 'DELETE FROM aprendiz WHERE id = ?'
    
    bd.query(consulta, [id], (error, data) =>{
        if (!error) {
            res.status(200).send({
                status:"OK",
                mensaje: "Registro eliminado exitosamente",
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

//Metodo POST :crear un aprendiz
aprendiz.post("/api/aprendiz/crear", (req, res) =>{
    //recibimos la data desde el formulario
    let frmDatos = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password
    }

    let consulta = 'INSERT INTO aprendiz SET ?'
    
    bd.query(consulta, [frmDatos], (error, data) =>{
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

//editar un aprendiz
aprendiz.put("/api/aprendiz/editarporid/:id", (req, res) =>{
    //recibimos la data desde el formulario
    let id = req.params.id
    let frmDatos = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password
    }

    let consulta = 'UPDATE aprendiz SET ? WHERE id = ?'
    
    bd.query(consulta, [frmDatos, id], (error, data) =>{
        if (!error) {
            res.status(200).send({
                status:"OK",
                mensaje: "Actualizacion exitosa",
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

module.exports = aprendiz