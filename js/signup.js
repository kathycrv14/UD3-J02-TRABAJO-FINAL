const btnRegistrar = document.getElementById('btnRegistrar')


async function guardarToken(usuario, contraseña) {
    
    const body = { usuario, contraseña };
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
  }
 


// Añade un evento clic al botón de registrar
btnRegistrar.addEventListener('click', function() {
    event.preventDefault(); // previene el envío del formulario

    const nombre = document.getElementById('txtnombre').value;
    const correo = document.getElementById('txtcorreo').value;
    const usuario = document.getElementById('txtusuario').value;
    const contraseña = document.getElementById('txtcontraseña1').value;
     const contraseña2 = document.getElementById('txtcontraseña2').value;
    // Crea un objeto con los datos del formulario
    const datos = {
      nombre: nombre,
      correo: correo,
      usuario: usuario,
      contraseña: contraseña
    };
  
    // Envía los datos al servidor
    fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        
    //guardar token de usuario    
    guardarToken(usuario, contraseña)
    const token = localStorage.getItem('token');
    
      window.location.href = "pokemonlist.html";
      })
      .catch(error => console.error(error))
  });
  