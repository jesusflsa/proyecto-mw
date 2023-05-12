/* Carrusel Inicial*/
const carrusel = document.querySelector("#carrusel");
const carruselImg = document.querySelectorAll(".carrusel_img");
const btnLeft = document.querySelector("#btn-izq");
const btnRight = document.querySelector("#btn-der");

let counter = 1;
btnRight.addEventListener('click', function () {
    if (counter < carruselImg.length) {
        counter++;
        carrusel.style.transform = `translateX(calc(${counter - 1}*-25%))`;
    } else {
        counter = 1;
        carrusel.style.transform = `translateX(0%)`;
    }
})
btnLeft.addEventListener('click', function () {
    if (counter == 1) {
        counter = carruselImg.length;
        carrusel.style.transform = `translateX(calc(${carruselImg.length - 1}*-25%))`
    } else {
        counter--;
        carrusel.style.transform = `translateX(calc(${counter - 1}*-25%))`
    }
})


/* Carrusel Testimonios */
const marcas = document.getElementById('contenedor_marcas')
const testimonios = document.getElementById('contenedor_testimonios')
const testimoniosItems = testimonios.querySelectorAll('.testimonio_item')
let contador = 0;
window.addEventListener('scroll', () => {
    let tamaño = window.innerHeight;
    let positionMarcas = marcas.getBoundingClientRect().top
    let positionTestimonios = testimonios.getBoundingClientRect().top
    /* Cuando los testimonios aparezcan en pantalla */
    if (positionTestimonios + 80 < tamaño) {
        if (contador == 0) {
            let i = 0
            const interval = setInterval(()=> {
                testimoniosItems[i].style.animation = 'aparicion .8s ease-in-out forwards'
                i++;
                if (i === testimoniosItems.length) {
                    clearInterval(interval)
                }
            }, 600)
            contador++;
        }
    }
    if (positionMarcas + 300 < tamaño) {
        marcas.querySelector('div').style.animation = animation = 'alineacion .8s ease-in-out forwards';
    }
})