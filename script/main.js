const container = document.getElementById('container');
const carritoFisico = document.getElementById("cart")
const carritoBoton = document.getElementById("cart-btn")
const cerrarCarrito = document.getElementById("close-cart")
const carritoFisicoInterno = document.getElementById("carrito-fisico-interno")
const total = document.getElementById('total')
const realizarPedido = document.getElementById('realizar-pedido')

carritoBoton.addEventListener("click", () => {
    carritoFisico.classList.toggle('show')
})

cerrarCarrito.addEventListener("click", () => {
    carritoFisico.classList.remove('show')
})

let carrito = [];


const opciones = [
	{   nom: 'Cheddar', 
        ingredientes: 'Pan con queso, cheddarx3, medallon,salsa especial',
        precio:'7500',
        id: 1,
        imagen:'"https://iili.io/FQRwmGt.th.png"'
    },
	{ 
        nom: 'Bacon', 
        ingredientes: 'Pan con queso, cheddar, medallon, bacon, cebolla caramelizada, salsa especial', 
        precio:'8500',
        imagen:'https://iili.io/FQNvmAP.th.png',
        id: 2 },
	{ 
        nom: 'Clasica', 
        ingredientes: 'Pan con sesamo, muzarella, medallon,lechuga y tomate, mayo de ajo', 
        precio:'7500',
        imagen:'https://iili.io/FQNvbHB.th.png"',
        id: 3 },
    { 
        nom: 'Napo', 
        ingredientes: 'Pan con sesamo, muzarella, medallon, tomate, jamon cocido, mayo de ajo', 
        precio:'8000',
        imagen:'"https://iili.io/FQNvyDF.th.png"',
        id: 4 },
    { 
        nom: 'Big', 
        ingredientes: 'Pan con sesamo, cheddar, medallon, pepinillos, lechuga, salsa especial', 
        precio:'9000',
        imagen:'"https://iili.io/FQNvpN1.th.png" ',
        id: 5 },
    { 
        nom: 'Spicy', 
        ingredientes: 'Pan con queso, cheddar, medallon, bacon, jalapeños, aji molido, huevo frito', 
        precio:'9000',
        imagen:'"https://iili.io/FQRwmGt.th.png"',
        id: 6 },
            { 
        nom: 'Chauchas Special', 
        ingredientes: 'Pan con sesamo, cheddar, medallon, lechuga y chauchas', 
        precio:'9000',
        imagen:'https://iili.io/FQN83Kv.th.png',
        id: 7 },
]  

const calculadoraTot = () => {
    let total = carrito.reduce((acum,el) => {
    return acum + Number(el.precio.replace('$', ''))

    }, 0)

    return total
}

const agregadoraCarrito = () => {
    carritoFisicoInterno.innerHTML = ''
    carrito.forEach((opcion) => {
        carritoFisicoInterno.innerHTML += `<h3>${opcion.nom}</h3>
        <p>$${opcion.precio}</p>`
    })

    let calculoTot = calculadoraTot()
    
    
    total.innerHTML = `<p> Total:$ ${calculoTot} </p>`
}


const agregadoraDeEventoDeBoton = () => {
	const botones = document.querySelectorAll('.boton-agregar')
	const arrayBoton = Array.from(botones)

	arrayBoton.forEach((boton) => {
		boton.addEventListener('click', (event) => {
			let id = event.target.parentNode.id

			let opcion = opciones.find((el) => el.id == id)

            carrito.push({...opcion})

            console.log(carrito)
            agregadoraCarrito()
		})
	})
}

const renderizador = () => {
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

realizarPedido.addEventListener("click", () => {
carrito = []
agregadoraCarrito()
})


document.addEventListener('DOMContentLoaded', () => (
renderizador()
))
