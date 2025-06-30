document.getElementById("login-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const user = JSON.parse(localStorage.getItem("usuario"));

  if (user && user.email === email && user.password === password) {
    alert("Inicio de sesión exitoso");
  } else {
    alert("Credenciales incorrectas");
  }
});

document.getElementById("register-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const user = { name, email, password };
  localStorage.setItem("usuario", JSON.stringify(user));
  alert("Registro exitoso. Ahora podés iniciar sesión.");
  window.location.href = "login.html";
});
