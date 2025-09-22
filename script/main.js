const container = document.getElementById('container');
const carritoFisico = document.getElementById("cart")
const carritoBoton = document.getElementById("cart-btn")
const cerrarCarrito = document.getElementById("close-cart")
const carritoFisicoInterno = document.getElementById("carrito-fisico-interno")
const total = document.getElementById('total')
const realizarPedido = document.getElementById('realizar-pedido')
const vaciarCarrito = document.getElementById('vaciar-carrito')



carritoBoton.addEventListener("click", () => {
    carritoFisico.classList.toggle('show')
})

cerrarCarrito.addEventListener("click", () => {
    carritoFisico.classList.remove('show')
})


let carrito = [];
let opciones = [] ;

cargarCarrito();

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
const guardado = localStorage.getItem('carrito');
    carrito = guardado ? JSON.parse(guardado) : [];
}


const calculadoraTot = () => {
    let total = carrito.reduce((acum,el) => {
    return acum + Number(el.precio.replace('$', ''))

    }, 0)

    return total
}


const agregadoraCarrito = () => {
  carritoFisicoInterno.innerHTML = '';
  carrito.forEach((opcion, idx) => {
    carritoFisicoInterno.innerHTML += `
      <div class="carrito-item">
          <h3>${opcion.nom}</h3>
          <p>$${opcion.precio}</p>
          <button class="quitar-producto" data-idx="${idx}">Quitar</button>
      </div>
    `;
  });

  let calculoTot = calculadoraTot();
  total.innerHTML = `<p> Total:$ ${calculoTot} </p>`;

  guardarCarrito();
};


carritoFisicoInterno.addEventListener("click", (e) => {
  if (e.target.classList.contains("quitar-producto")) {
    const idx = e.target.getAttribute("data-idx");
    carrito.splice(idx, 1);
    guardarCarrito();
    agregadoraCarrito();
  }
});


realizarPedido.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  agregadoraCarrito();
});


const agregadoraDeEventoDeBoton = () => {
    const botones = document.querySelectorAll('.boton-agregar')
    const arrayBoton = Array.from(botones)

    arrayBoton.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            let id = event.target.parentNode.id

            let opcion = opciones.find((el) => el.id == id)

            carrito.push({...opcion})

           
            boton.classList.add('success');
            setTimeout(() => {
                boton.classList.remove('success');
            }, 900);

            agregadoraCarrito()
        })
    })
}


const renderizador = () => {
    container.innerHTML = '';
    opciones.forEach((opcion) => {
        container.innerHTML += `<section class="product-card" id=${opcion.id}>
		<br>		
        <img
					src=${opcion.imagen}
					alt=${opcion.ingredientes}
				/>
                
				<h2>${opcion.nom}</h2>
				<p>${opcion.ingredientes}</p>
				<span class="price">$${opcion.precio}</span>
                <br><br>
				<button class='boton-agregar'>Agregar al pedido</button>
			</section>`
	})
	agregadoraDeEventoDeBoton()
}


fetch("./datos.json")
  .then(res => res.json())
  .then(data => {
    opciones = data;
    renderizador(); 
  })