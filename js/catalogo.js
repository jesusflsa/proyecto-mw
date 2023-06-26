
class Catalogo {
    constructor(name, price, discount, imagen) {
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.imagen = imagen;
    }
}

/* JSON */

var xhr = new XMLHttpRequest;

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var datos = JSON.parse(xhr.responseText);

        /* Declaracion de variables globales */
        const catalogoContenedor = document.getElementById('catalogoContenedor');
        const categoria = document.querySelector('title').innerHTML;

        let orden = [];
        let com;

        /* Función para ordenar de menor a mayor */
        function menorMayor() {
            let menMay = orden.slice();

            for (let i = 0; i < menMay.length; i++) {
                for (let j = i; j < menMay.length; j++) {
                    if (parseFloat(menMay[i][1]) > parseFloat(menMay[j][1])) {
                        com = menMay[i];
                        menMay[i] = menMay[j];
                        menMay[j] = com;
                    }
                }
            }

            ordenarCatalogo(menMay)

        }

        /* Función para ordenar de mayor a menor */
        function mayorMenor() {

            let mayMen = orden.slice();

            for (let i = 0; i < mayMen.length; i++) {
                for (let j = i; j < mayMen.length; j++) {
                    if (parseFloat(mayMen[i][1]) < parseFloat(mayMen[j][1])) {
                        com = mayMen[i];
                        mayMen[i] = mayMen[j];
                        mayMen[j] = com;
                    }
                }
            }

            ordenarCatalogo(mayMen)

        }

        /* Función para ordenar catalogo de manera aleatoria */
        function ordenarCatalogo(valor) {

            catalogoContenedor.innerHTML = ''

            let orCat = valor.slice();

            for (let i = 0; i < orden.length; i++) {
                if (datos[orCat[i][0]].descuento === '') {
                    catalogoContenedor.innerHTML += `<div class="catalogo_item"><div class="catalogo_img"><img src=../${datos[orCat[i][0]].imagen} alt=""></div><div class="catalogo_desc"><div class="catalogo_item_price"><h3>${datos[orCat[i][0]].nombre}</h3><div class="catalogo_item_price_value"><p>S/.${datos[orCat[i][0]].precio}</p></div></div><div class="catalogo_item_carrito"><img src="../img/carrito.png" alt="add"></div></div></div>`
                }
                else {
                    catalogoContenedor.innerHTML += `<div class="catalogo_item"><div class="catalogo_img"><img src=../${datos[orCat[i][0]].imagen} alt=""></div><div class="catalogo_desc"><div class="catalogo_item_price"><h3>${datos[orCat[i][0]].nombre}</h3><div class="catalogo_item_price_value"><del>S/.${datos[orCat[i][0]].descuento}</del><p>S/.${datos[orCat[i][0]].precio}</p></div></div><div class="catalogo_item_carrito"><img src="../img/carrito.png" alt="add"></div></div></div>`
                }
            }
        }

        /* Recopilacion de los datos del catalogo */
        for (let i = 0; i < datos.length; i++) {

            let name = datos[i].nombre;
            let price = datos[i].precio;
            let discount = datos[i].descuento;
            let imagen = datos[i].imagen;

            const catalogo = new Catalogo(name, price, discount, imagen);

            if (datos[i].categoria === categoria || categoria == 'Inicio') {
                orden.push([i, price])
            }

        }

        /* Boton del filtrar en los Catalogos*/
        
        const btnFiltrar = document.getElementById('filtrar');
        btnFiltrar.addEventListener('change', () => {
            const valorFiltro = btnFiltrar.value;

            switch (valorFiltro) {
                case 'menor-precio':
                    menorMayor();
                    break;

                case 'mayor-precio':
                    mayorMenor();
                    break;

                default:
                    ordenarCatalogo(orden);
                    break;
            }
        } )

        /* Ordenar Catalogo en la pestaña Inicio */
        if (categoria !== 'Inicio') {
            ordenarCatalogo(orden);
        }
        else {
            const inCat = orden.slice();

            /* Ordenar todo el catalogo por menor precio */
            for (let i = 0; i < inCat.length; i++) {
                for (let j = i; j < inCat.length; j++) {
                    if (parseFloat(inCat[i][1]) > parseFloat(inCat[j][1])) {
                        com = inCat[i];
                        inCat[i] = inCat[j];
                        inCat[j] = com;
                    }
                }

            }

            /* Imprimir los 6 primeros items */
            for (let i = 0; i < datos.length && i < 6; i++) {
                let pagina = datos[inCat[i][0]].categoria;

                switch (pagina) {
                    case "Hombres":
                        pagina = "hombres";
                        break;
                    case "Mujeres":
                        pagina = "mujeres";
                        break;
                    case "Niños":
                        pagina = "ninos";
                        break;
                    default:
                        break;
                        
                }
                
                if (datos[inCat[i][0]].descuento == '') {
                    document.querySelector('.promociones_items').innerHTML += `<div class="promocion_item"><div class="promocion_img"><a href="paginas/${pagina}.html"><img src=${datos[inCat[i][0]].imagen} alt=""></a></div><div class="promocion_item_desc"><h3>${datos[inCat[i][0]].nombre}</h3><div class="promocion_item_price"><p class="promocion_item_price">S/. ${datos[inCat[i][0]].precio}</p></div></div></div>`
                }
                else {
                    document.querySelector('.promociones_items').innerHTML += `<div class="promocion_item"><div class="promocion_img"><a href="paginas/${pagina}.html"><img src=${datos[inCat[i][0]].imagen} alt=""></a></div><div class="promocion_item_desc"><h3>${datos[inCat[i][0]].nombre}</h3><div class="promocion_item_price"><del class="promocion_item_price">S/. ${datos[inCat[i][0]].descuento}</del><p class="promocion_item_price">S/. ${datos[inCat[i][0]].precio}</p></div></div></div>`
                }
            }
        }



    }
}

if (document.querySelector('title').innerHTML !== 'Inicio') {
    xhr.open('GET', '../js/catalogo.json', true);
}
else {
    xhr.open('GET', 'js/catalogo.json', true);
}
xhr.send()