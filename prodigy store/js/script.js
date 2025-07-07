document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("product-list");
  const contador = document.getElementById("cart-counter");
  const buscador = document.getElementById("buscar-producto");
  const btnCategorias = document.getElementById("botones-categorias");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let productosGlobal = [];
  let categoriaActiva = "Todos";

  contador.textContent = carrito.length;

  fetch("data/productos.json")
    .then(res => res.json())
    .then(productos => {
      productosGlobal = productos;
      renderizarCategorias(productosGlobal);
      renderizarProductos(productosGlobal);
    });

  function renderizarCategorias(productos) {
    const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];
    btnCategorias.innerHTML = "";
    categorias.forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.classList.add("btn");
      if (cat === "Todos") btn.classList.add("active");
      btn.addEventListener("click", () => {
        categoriaActiva = cat;
        document.querySelectorAll("#botones-categorias .btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        aplicarFiltros();
      });
      btnCategorias.appendChild(btn);
    });
  }

  function renderizarProductos(productos) {
    contenedor.innerHTML = "";
    productos.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto-card");
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button data-id="${producto.id}">Agregar al carrito</button>
      `;
      contenedor.appendChild(div);
    });
  }

  contenedor.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.dataset.id);
      const producto = productosGlobal.find(p => p.id === id);
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      contador.textContent = carrito.length;
      mostrarToast();
    }
  });

  buscador.addEventListener("input", aplicarFiltros);

  function aplicarFiltros() {
    const texto = buscador.value.toLowerCase();
    let filtrados = productosGlobal.filter(p => p.nombre.toLowerCase().includes(texto));
    if (categoriaActiva !== "Todos") {
      filtrados = filtrados.filter(p => p.categoria === categoriaActiva);
    }
    renderizarProductos(filtrados);
  }

  function mostrarToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("active");
    setTimeout(() => toast.classList.remove("active"), 2000);
  }
});
