const perfilnombre = document.getElementById("perfilnombre")
const perfilcorreo = document.getElementById("perfilcorreo")
const perfilusuario = document.getElementById("perfilusuario")
const perfilcontra = document.getElementById("perfilcontra")

const btnEditar = document.getElementById("btnEditar")
const btnGuardar = document.getElementById("btnGuardar")
const btnEliminar = document.getElementById("btnEliminar")
//btnGuardar empieza deshabilitado
btnGuardar.disabled = true;
deshabilitarinputs()
function deshabilitarinputs() {
 perfilnombre.disabled = true;
perfilcorreo.disabled = true;
perfilusuario.disabled = true;
perfilcontra.disabled = true;
}
// funcion para habilitar boton de Guardar
function habilitarBotonGuardar() {
    btnGuardar.disabled = false;
  }
 //cuando los input cambien se llama a la funcion para habilitar 
  perfilnombre.addEventListener("input", habilitarBotonGuardar);
  perfilcorreo.addEventListener("input", habilitarBotonGuardar);
  perfilusuario.addEventListener("input", habilitarBotonGuardar);
  perfilcontra.addEventListener("input", habilitarBotonGuardar);

//funcion retorna un objeto con los datos del usuario
async function getDatosUsuario(token) {
    try {
      const response = await fetch(`http://localhost:3000/api/usuario/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return {
        nombre: data.nombre,
        correo: data.correo,
        usuario: data.usuario,
        contraseña: data.contraseña
      };
    } catch (error) {
      console.error(error);
    }
  }
 //token 
const token = localStorage.getItem('token');

getDatosUsuario(token).then((data) => {
    perfilnombre.value = data.nombre;
    perfilcorreo.value = data.correo;
    perfilusuario.value = data.usuario;
    perfilcontra.value = data.contraseña;
  });
  
  //Funcion para actualizar datos del usuario
  async function actualizarUsuario(id, data) {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      console.error(error);
    }
  }
  

  //funcion para eliminar usuario
  async function eliminarUsuario(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return true;
    } catch (error) {
      console.error(error);
    }
  }
  
  
  btnEditar.addEventListener("click",()=>{
    perfilnombre.disabled = false;
    perfilcorreo.disabled = false;
    perfilusuario.disabled = false;
    perfilcontra.disabled = false;
  })

  btnGuardar.addEventListener("click", () => {
    const datosUsuario = {
      nombre: perfilnombre.value,
      correo: perfilcorreo.value,
      usuario: perfilusuario.value,
      contraseña: perfilcontra.value
    };
  
    const confirmation = confirm("¿Estás seguro de actualizar tus datos?");
    if (confirmation) {
      actualizarUsuario(token, datosUsuario)
        .then(() => {
          getDatosUsuario(token).then((data) => {
            perfilnombre.value = data.nombre;
            perfilcorreo.value = data.correo;
            perfilusuario.value = data.usuario;
            perfilcontra.value = data.contraseña;
          });
        })
        .catch((error) => {
          console.error(`Error updating user: ${error}`);
        });
  
      deshabilitarinputs();
    }
  });


  btnEliminar.addEventListener("click", () => {
    try {
      if (confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
        if (eliminarUsuario(token)) {
          alert("Cuenta eliminada");
          window.location.href = "index.html";
        }
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al intentar eliminar la cuenta. Por favor, inténtalo de nuevo más tarde.");
    }
  });
  