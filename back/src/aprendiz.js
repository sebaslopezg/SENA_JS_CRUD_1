
//instancia express : sierve para api rest 
const express = require('express')
const aprendiz = express() 
const bd = require('./bd.js')
const bcrypt = require('bcryptjs')

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
        password: bcrypt.hashSync(req.body.password, 8)
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


//NUEVO CODIGO





aprendiz.post("/api/aprendiz/login", (req, res) => {
    //datos de la peticion (body)
    let email = req.body.email;
    let password = req.body.password;
  
    //validamos que la data esté completa
    if (!email || !password) {
      res.status(400).send({
        consulta: "error",
        mensaje: "faltan datos por enviar del formulario ! ",
      })
    }else{

        let correo;
        let pass;
        let lasname;
        let name;
        // buscar en la bd el usuario  y validar
        bd.query(
          "SELECT nombre, apellido, email, password FROM aprendiz WHERE email like ?",
          [email],
          (error, consulta) => {
            consulta.forEach((apren) => {
                //seteamos la variable con el resultado de la consulta
              pass = apren.password;
              correo = apren.email;
              name = apren.name;
              lasname = apren.lastname;
            });
            //validacion 1: email existe
            if (correo == null) {
              res.status(400).send({
                status: "error",
                mensaje: "Usuario no existe en la BD",
              });
            }else{
                //console.log(password);
                //console.log(pass);
                let pwd = bcrypt.compareSync(password, pass);
                console.log(pwd);
                if (!pwd) {
                res.status(400).send({
                    status: "error",
                    mensaje: "Pwd Incorrecto !",
                });
                } else {
                res.status(200).send({
                    consulta: "ok",
                    mensaje: "Ingreso exitoso al sistema!",
                    user: name + " " + lasname,
                    email: email,
                });
                }
            }
    
          }
        );
    }
  });
  
module.exports = aprendiz