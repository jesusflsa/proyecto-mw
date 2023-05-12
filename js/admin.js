function guardar(llave, valor)
{
    localStorage.setItem(llave, JSON.stringify(valor))
}
function obtener(llave)
{
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}


productos = obtener('productos') || [];
mensaje = document.getElementById('mensaje');

/* Añadir Productos */
const addCategory = document.getElementById('addCategory');
const addName = document.getElementById('addName');
const addPrice = document.getElementById('addPrice');
const addDiscount = document.getElementById('addDiscount');
const addImage = document.getElementById('addImage');

document.getElementById('addBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    let categoria = addCategory.value;
    let nombre = addName.value;
    let precio = addPrice.value;
    let descuento = addDiscount.value;
    let imagen = addImage.value;

    let valido = true;

    if (categoria == '' || nombre == '' || precio == '' || imagen == '') 
    {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => {mensaje.classList.remove('llenarCampos')}, 2500);
        valido = false;
    } 
    else
    {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].name == nombre) {
                mensaje.classList.add('elementoRepetido')
                setTimeout(() => {mensaje.classList.remove('elementoRepetido')}, 1500);
                valido = false
            }
        }
    }

    if (valido == true) 
    {

        if (descuento == '')
        {
            productos.push({
                categoria: categoria,
                nombre: nombre,
                precio: precio,
                descuento: descuento,
                imagen: imagen
            })
            mensaje.classList.add('realizado')
                
                setTimeout(() => {
                    mensaje.classList.remove('realizado')
                    window.location.reload()}
                    , 1500);
        }
        else
        {
            if (parseFloat(descuento) > parseFloat(precio))
            {
                productos.push({
                    categoria: categoria,
                    nombre: nombre,
                    precio: precio,
                    descuento: descuento,
                    imagen: imagen
                })
                mensaje.classList.add('realizado')
                    
                    setTimeout(() => {
                        mensaje.classList.remove('realizado')
                        window.location.reload()}
                        , 1500);
            }
            else
            {
                mensaje.classList.add('descuentoMayor')
                    
                    setTimeout(() => {mensaje.classList.remove('descuentoMayor')}
                        , 1500);
            }
        }

        
    }
    guardar('productos', productos);
})


/* Editar Productos */
const editName = document.getElementById('editName');
const editAttribute = document.getElementById('editAttribute');
const editValue = document.getElementById('editValue');

document.getElementById('editBtn').addEventListener('click', function(e) {
    e.preventDefault();

    let nombre = editName.value;
    let atributo = editAttribute.value;
    let value = editValue.value;

    let valido = false
    
    if (nombre == '' || atributo == '' || value == '') {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => {mensaje.classList.remove('llenarCampos')}, 2500);
    }
    
    else
    {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].name == nombre) {
                productos[i][atributo] == value;
                valido = true;
            }
        }

        if (valido = true)
        {
            mensaje.classList.add('realizado');
            setTimeout(() => {mensaje.classList.remove('realizado'); window.location.reload()}, 1500);    
        }
        else
        {
            mensaje.classList.add('noExiste');
            setTimeout(() => {mensaje.classList.remove('noExiste')}, 1500);
        }

        guardar('productos', productos);
    }
})

/* Eliminar Productos */
const delName = document.getElementById('delName');

document.getElementById('delBtn').addEventListener('click', function(e) {
    e.preventDefault();

    let nombre = delName.value;

    valido = false;

    if (nombre == '')
    {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => {mensaje.classList.remove('llenarCampos')}, 2500);
    }
    else
    {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i][nombre] = nombre)
            {
                productos.splice(i, 1);
                valido = true    
            }
        }
    }

    if (valido == false)
    {
        mensaje.classList.add('noExiste');
        setTimeout(() => {mensaje.classList.remove('noExiste')}, 2500);
    }
    else
    {
        mensaje.classList.add('realizado');
        setTimeout(() => {mensaje.classList.remove('realizado'); window.location.reload()}, 1500);
    }

    guardar('productos', productos)
})

/* Mostrar Productos */

window.addEventListener('load', function () 
{
    const editName = document.getElementById('editName');
    const delName = document.getElementById('delName');

    for (let i = 0; i < productos.length; i++) {
        editName.innerHTML += `<option>${productos[i].nombre}</option>`   
        delName.innerHTML += `<option>${productos[i].nombre}</option>`
    }
    Object.keys(productos[0]).forEach(element =>{
        editAttribute.innerHTML += `<option>${element}</option>`
    });

    const showProducts = document.getElementById('showProducts');
    
    showProducts.innerHTML = '';
    for (let i = 0; i < productos.length; i++) {
                
        showProducts.innerHTML += `<div class="promocion_item"><img src="${productos[i].imagen}" alt="${productos[i].nombre}"><div class="promocion_item_desc"><h3>${productos[i].nombre}</h3><del class="promocion_item_price">${productos[i].precio}</del><p class="promocion_item_price">${productos[i].descuento}</p></div></div>`
    }
})


/* Descargar Productos */

const guardarArchivoDeTexto = function (contenido, nombre) 
{
    const a = document.createElement("a");
    const archivo = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
}

document.getElementById('download').addEventListener('click', function () 
{
    guardarArchivoDeTexto(JSON.stringify(productos), "catalogo.json");

})