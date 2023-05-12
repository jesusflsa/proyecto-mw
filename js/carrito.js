/* Funcion para almacenar objetos */
function guardar(titulo, valor) {
    localStorage.setItem(titulo, JSON.stringify(valor))
}
function obtener(titulo) {
    const datos = JSON.parse(localStorage.getItem(titulo))
    return datos
}

/* Declaracion de Variables */
const main = document.querySelector('main');
const carrito = document.querySelector('#carrito');
const carritoIcono = document.querySelector('#carrito-icon');
const cerrarMenu = document.querySelector('#cerrar-carrito');

const productos = obtener('carritoCatalogo') || [];
const lista = [];

/* Clase general de los items */
class Producto {
    constructor(img, name, price) {
        this.img = img;
        this.name = name;
        this.price = price;
    }

}

/* Comportamiento de la interfaz */
class UI {

    /* Añadir productos */
    addProduct(elemento, item) {
        if (elemento.alt === 'add') {
            
            const carritoLista = document.getElementById('carrito-lista');
            const element = document.createElement('div')
            element.innerHTML = `<img class="item-picture" src="${item.img}" alt=""><div class="item-nombre">${item.name}</div><div class="item-price">S/.<div class="item-price-value">${parseFloat(item.price).toFixed(2)}</div></div><img class="item-close" src="../img/cerrar.png" alt="eliminar">`;
            carritoLista.appendChild(element);
            element.classList.add('carrito-item');
            
        }
        
    }
    
    /* Eliminar productos */
    deleteProduct(elemento) {
        if (elemento.alt === 'eliminar') {
            const posicion = elemento.parentElement;
            posicion.remove();
        }
    }
    
    /* Limpiar carrito */
    resetProduct() {
        
        const carritoLista = document.getElementById('carrito-lista');
        carritoLista.innerHTML = '';
    }

    /* Calcular precios */
    calcularPrecio() {
        const precio = document.querySelectorAll('.item-price-value');
        const precioTotal = document.querySelector('.carrito-precio-total');
        let total = 0;
        for (let i = 0; i < precio.length; i++) {
            const element = precio[i].innerHTML;
            total = total + parseFloat(element);
        }
        precioTotal.innerHTML = `S/. ${total.toFixed(2)}`;

        const contador = document.getElementById('carrito-lista').querySelectorAll('div.carrito-item')
        if (contador.length >= 1)
        {
            document.getElementById('contador').innerHTML = contador.length;  
            document.querySelector('.contenedor_contador').style.display = 'flex';
        }
        else
        {
            document.querySelector('.contenedor_contador').style.display = 'none';
        }
    }

    /* Almacenar productos */

}

/* DOM */

/* Abrir Carrito */
carritoIcono.addEventListener("click", function () {

    carrito.classList.remove('hidden');
    carrito.classList.add('showed')
    const ui = new UI();
    ui.calcularPrecio();
    main.classList.add('stopped')

})

/* Cerrar Carrito */
cerrarMenu.addEventListener("click", function () {
    carrito.classList.add('hidden');
    carrito.classList.remove('showed');
    main.classList.remove('stopped')

})

/* Click en los productos */
document.getElementById('catalogoContenedor')
    .addEventListener('click', function (e) {

        const posicion = e.target.parentElement.parentElement.parentElement;
        const img = posicion.querySelector('img').src;
        const name = posicion.querySelector('h3').innerHTML;
        const price = parseFloat(posicion.querySelector('p').innerHTML.slice(3));
        const items = new Producto(img, name, price);
        const ui = new UI();

        ui.addProduct(e.target, items);
        ui.calcularPrecio();

    })

document.getElementById('carrito-lista')
    .addEventListener('click', function (e) {

        const ui = new UI();

        ui.deleteProduct(e.target);
        ui.calcularPrecio();

    })

document.getElementById('procesar')
    .addEventListener('click', function (e) {

        const ui = new UI();

        ui.resetProduct()
        ui.calcularPrecio();

    })