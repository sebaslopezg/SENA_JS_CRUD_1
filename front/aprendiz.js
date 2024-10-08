//const aprendiz = require("../back/src/aprendiz.js")

let api = "http://localhost:4100/api/aprendiz/"
const content = document.getElementById('content')
const contenidoTabla = document.getElementById('contenidoTabla')
const frmAprendiz = document.getElementById('frmAprendiz')
let nombre = document.querySelector('#nombre')
let apellido = document.querySelector('#apellido')
let email = document.querySelector('#email')
let password = document.querySelector('#password')

function listarTodos(){
    fetch(api + 'listartodos')
    .then(res=>res.json())
    .then(data=>printTable(data))
}

function print(data) {
    content.innerHTML += `
    <span><b>ID</b></span>
    <span><b>Nombre</b></span>
    <span><b>Apellido</b></span>
    <span><b>Email</b></span>
    <span><b>Password</b></span>
    <br>
    `
    for (let i = 0; i < data.datos.length; i++) {

        content.innerHTML += `

            <span>${data.datos[i].id}</span>
            <span>${data.datos[i].nombre}</span>
            <span>${data.datos[i].apellido}</span>
            <span>${data.datos[i].email}</span>
            <span>${data.datos[i].password}</span>
            <br>

        `
    }
}

function printTable(data){

    data.datos.forEach(aprendiz => {
        console.log(aprendiz.apellido)
        contenidoTabla.innerHTML += `
        <tr>
            <td>${aprendiz.id}</td>
            <td>${aprendiz.nombre}</td>
            <td>${aprendiz.apellido}</td>
            <td>${aprendiz.email}</td>
        </tr>
        `
    });


}

frmAprendiz.addEventListener("submit", (e)=>{
    //Previene el evento por defecto de los formularios que hace submit automatico
    //evitamos enviar espacios en vacio y controlamos el envio desde el boton
    e.preventDefault()
    fetch(api + 'crear',{
        method: "POST",
        //Configuramos que la cabecera(header) de peticion lleve una configuracion: contiene un archivo JSON 
        headers: {
            "Content-Type": "application/json"
        },
        //para serializar un objeto JS a JSON
        body: JSON.stringify({
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            password: password.value
        })
    })
    .then((res)=>res.json())
    .then((res)=>M.toast({html: res.mensaje}))
})

