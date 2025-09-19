// Mostrar formularios
function mostrarLogin() {
  document.getElementById("registro").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function mostrarRegistro() {
  document.getElementById("registro").style.display = "block";
  document.getElementById("login").style.display = "none";
}

// Guardar usuarios en localStorage
document.getElementById("formRegistro").addEventListener("submit", function(e) {
  e.preventDefault();
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si ya existe
  let existe = usuarios.find(u => u.email === email);
  if (existe) {
    alert("Ya existe una cuenta con este correo. Inicia sesión.");
    mostrarLogin();
    return;
  }

  usuarios.push({ nombre, email, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Registro exitoso, ahora puedes iniciar sesión.");
  mostrarLogin();
});

// Login
document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();
  let email = document.getElementById("emailLogin").value;
  let password = document.getElementById("passwordLogin").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    // Guardar sesión
    localStorage.setItem("sesion", JSON.stringify(usuario));

    // Redirigir al menú principal
    window.location.href = "menu.html";
  } else {
    let existe = usuarios.find(u => u.email === email);
    if (existe) {
      alert("Contraseña incorrecta.");
    } else {
      alert("No existe una cuenta con ese correo. Regístrate primero.");
      mostrarRegistro();
    }
  }
});

// Revisar si hay sesión guardada
window.onload = () => {
  // 👇 Aquí ya NO redirige solo por tener sesión
  // Siempre muestra el registro al cargar
  mostrarRegistro();
};
