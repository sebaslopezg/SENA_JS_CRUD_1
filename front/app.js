let api = "http://localhost:4100/api/aprendiz/listartodos"
const content = document.getElementById('content')
fetch(api)
    .then(res=>res.json())
    .then(data=>print(data))


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

    content.innerHTML += "</table>"
}

function printTable(data) {
    let table = document.createElement("table")
    content.appendChild(table)
}