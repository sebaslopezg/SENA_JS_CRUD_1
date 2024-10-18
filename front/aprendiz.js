// interacciones con la tabla aprendiz
let contenido = document.querySelector("#contenido")
let frmAprendiz = document.querySelector("#frmAprendiz")
let nombre = document.querySelector("#nombre")
let apellido = document.querySelector("#apellido")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
//Llamamos el metodo de creacion del modal de bootstrap
//tener en cuenta que funciona con bootstrap bundle
const myModal = new bootstrap.Modal(
  document.getElementById('')
)

let api = "http://localhost:4100/api/aprendiz/";


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
  // previene el evento por defecto de los formularios que hace submit automatico
  // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar
  e.preventDefault();
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
});

