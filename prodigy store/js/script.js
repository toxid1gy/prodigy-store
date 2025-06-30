const productos = [
  { id: 1, nombre: "Auriculares Bluetooth", precio: 15000 },
  { id: 2, nombre: "Joystick Gamer", precio: 20000 },
  { id: 3, nombre: "Cargador Tipo C", precio: 8000 }
];

const contenedor = document.getElementById("product-list");

productos.forEach(producto => {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
  `;
  contenedor.appendChild(div);
});

function agregarAlCarrito(id) {
  alert(`Producto ${id} agregado al carrito`);
}
