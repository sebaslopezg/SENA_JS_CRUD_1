
//instancia express : sierve para api rest 
const express = require('express')
const aprendiz = express() 
const bd = require('./bd.js')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const path = require('path')
//const {error} = requre('console')
const fs = require('fs')

//configuracion del almacenamiento multer
//seteo del storage del multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, "img-"+Date.now() + "_" + file.originalname)
    }
  })
  //instanciamos el storage
  const upload = multer({ storage: storage })

//rutas para consultar bases de datos
/* aprendiz.get("/api/aprendiz/listartodos", (req, res) =>{
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
}) */

aprendiz.get("/api/aprendiz/listartodos", (req, res) =>{
    let limite = parseInt(req.query.limite) 
    let pagina = parseInt(req.query.pagina)
    let offset = (pagina - 1) * limite

    let consulta1 = 'SELECT COUNT(*) AS totalaprendices FROM aprendiz'
    let consulta2 = 'SELECT * FROM aprendiz LIMIT ? OFFSET ?'

    bd.query(consulta1, (error, totalaprendices) =>{
        bd.query(consulta2, [limite, offset], (error, aprendiz) =>{
            console.log(typeof limite)
            res.send({
                totalaprendiz:totalaprendices,
                data:aprendiz
            })
        })
    })
})

//paginacion
aprendiz.get("/api/aprendiz/consulta/?", (req, res) =>{
    let parametro = req.params //usa la sintaxis de parametro/:nombreParametro
    let query = req.query //sintaxis url /?nombrevariable=valor&nombrevariable=valor...

    res.send({
        parametros: parametro,
        querys: query
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

//Agregar editar en imagenes
aprendiz.put("/api/aprendiz/subirimagen/:id",
    [upload.single("foto")],
    (req, res) => {
        //validar que llegue el archivo wn
        if (!req.file) {
            res.status(404).send({
                status:false,
                msg: "Debe seleccionar un archivo valido"
            })
        }
    
        let archivo = req.file.originalname
        let archivoSplit = archivo.split(".")
        let extension = archivoSplit[1]
    
        //bd.query("SELECT id FROM aprendiz WHERE")
    
        if (extension != "png" && extension != "jpg"  && extension != "jpeg" && extension != "webp") {
            fs.unlink(req.file.path, (error) =>{
                res.status(404).send({
                    status:false,
                    msg:"formato de imagen invalido!"
                })
            })
        }
    
        let id = req.params.id
        let foto = req.file.filename
        bd.query("UPDATE aprendiz SET foto= ? WHERE id = ?", [foto, id], (error, data)=>{
            if (error) {
                res.status(404).send({
                    status:false,
                    msg:"Hay un error en la consulta"
                })
            }else{
                res.status(200).send({
                    status:true,
                    msg:"Imagen actualizada exitosamente",
                    data:data
                })
            }
        })
    })

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


//NUEVO CODIGO

//devolver a la imagen de la api
aprendiz.get("/api/aprendiz/getimagen/:foto", (req, res) =>{
    //obtener el parametro de la imagen
    let foto = req.params.foto

    //validamos la solicitud

    if (!foto) {
        req.status(404).send({
            status:false,
            msg:"debe ingresar un archivo"
        })
    }else{
        res.send({
            ruta:"http://localhost/4100:/uploads/images/"+foto
        })
    }
})
  
module.exports = aprendiz


/* 
codigo comentariado




aprendiz.put("/api/aprendiz/subirimagen/:id",
[upload.single("foto")],
(req, res) => {
    //validar que llegue el archivo wn
    if (!req.file) {
        res.status(404).send({
            status:false,
            msg: "Debe seleccionar un archivo valido"
        })
    }

    let archivo = req.file.originalname
    let archivoSplit = archivo.split(".")
    let extension = archivoSplit[1]

    //bd.query("SELECT id FROM aprendiz WHERE")

    if (extension != "png" && extension != "jpg"  && extension != "jpeg" && extension != "webp") {
        fs.unlink(req.file.path, (error) =>{
            res.status(404).send({
                status:false,
                msg:"formato de imagen invalido!"
            })
        })
    }

    let id = req.params.id
    let foto = req.file.filename
    bd.query("UPDATE aprendiz SET foto= ? WHERE id = ?", [foto, id], (error, data)=>{
        if (error) {
            res.status(404).send({
                status:false,
                msg:"Hay un error en la consulta"
            })
        }else{
            res.status(200).send({
                status:true,
                msg:"Imagen actualizada exitosamente",
                data:data
            })
        }
    })
})

*/