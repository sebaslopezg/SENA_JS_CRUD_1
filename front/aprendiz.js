const { on } = require("events")

// interacciones con la tabla aprendiz
let contenido = document.querySelector("#contenido")
let frmAprendiz = document.querySelector("#frmAprendiz")
let nombre = document.querySelector("#nombre")
let apellido = document.querySelector("#apellido")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
const frmCrearAprendiz = querySelector('')

//Llamamos el metodo de creacion del modal de bootstrap
//tener en cuenta que funciona con bootstrap bundle
const myModal = new bootstrap.Modal(
  document.getElementById('')
)

let api = "http://localhost:4100/api/aprendiz/";
let accion = ""

//metodo para listar todos los registros
//agregr paginacion limite pagina al enlace para listar por paginacion
function listartodos(){
  fetch(api+'listartodos')
  .then((res) => res.json())
  .then((res) => { 
  /*  for (let index = 0; index < res.aprendiz.length; index++) {         
     contenido.innerHTML +=   `${res.aprendiz[index].nombre} ${res.aprendiz[index].apellido} <br>`     
    }
 
    res.aprendiz.map((aprendiz)=>{
      contenido.innerHTML +=   `${aprendiz.nombre} ${aprendiz.apellido} <br>`   
    }) */
    res.aprendiz.forEach((aprendiz)=>{
      let fila =   `<tr> <td>${aprendiz.id}</td> <td>${aprendiz.nombre}</td> <td>${aprendiz.apellido}</td>  <td>${aprendiz.email}</td></tr><br>`   
      contenido.innerHTML = fila
    })

  });
}
// envia datos por el formulario, el request lleva una payload que es la data de los formularios, 
// metodo post



frmAprendiz.addEventListener("submit", (e) => {
  e.preventDefault();
  // previene el evento por defecto de los formularios que hace submit automatico
  // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar


  if (accion = "crear") {
    fetch(api + "crear", {
      method: "POST",
      // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
      headers: {
        "Content-Type": "application/json",
      },
      //carga o payload del request o peticion, serializar un objeto JS  a JSON
      body: JSON.stringify({
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
        M.toast({ html: `${res.mensaje}` });
      });
  }

  //Accion editar
  //revisar y organizar 
  if (accion = "editar") {
    fetch(api + "editarporid", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
        M.toast({ html: `${res.mensaje}` });
      });
  }

  frmCrearAprendiz.hide()
});

//Metodo que llama el formulario modal para creacion de registros
btnNuevo.addEventListener('click', ()=>{
  accion = "crear"
})

//metodo para borrar seleccionado por fila el registro
on(document, 'click', '.btnBorrar', (e)=>{
  console.log('borrado')
})


//metodo para llamar al formulario de edicion y pasarle los campos a editar
//definimos el id
let idform = ""
on(document, 'click', '.btnEditar', (e)=>{
  const fila = e.target.parentNode.parentNode.parentNode
  const id = fila.children[0].innerHTML
  console.log(id)
  idform = id
  nombre.value = fila.children[1].innerHTML
  apellido.value = fila.children[2].innerHTML
  email.value = fila.children[3].innerHTML
  accion = "editar"
  frmCrearAprendiz.show()
})