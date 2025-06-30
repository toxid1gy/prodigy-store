function mostrarCarritoCompleto() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const container = document.getElementById("cart-items-page");
  const totalSpan = document.getElementById("total-page-price");
  container.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.nombre} - $${item.precio}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    container.appendChild(div);
    total += item.precio;
  });

  totalSpan.textContent = total;
}

function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarritoCompleto();
}

window.addEventListener("DOMContentLoaded", mostrarCarritoCompleto);
