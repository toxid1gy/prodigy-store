document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total-price");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderCarrito() {
    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
      const div = document.createElement("div");
      div.classList.add("producto-card");
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button data-index="${index}" class="eliminar">Eliminar</button>
      `;
      contenedor.appendChild(div);
      total += producto.precio;
    });

    totalSpan.textContent = total;
  }

  contenedor.addEventListener("click", e => {
    if (e.target.classList.contains("eliminar")) {
      const index = parseInt(e.target.dataset.index);
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    }
  });

  document.getElementById("finalizar-compra").addEventListener("click", () => {
    if (carrito.length > 0) {
      alert("Compra finalizada. ¡Gracias por tu pedido!");
      carrito = [];
      localStorage.removeItem("carrito");
      renderCarrito();
    } else {
      alert("El carrito está vacío.");
    }
  });

  renderCarrito();
});
