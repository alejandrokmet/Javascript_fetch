//SELECCIONAR ELEMENTOS

const elementoProducto = document.querySelector(".galeria");
const elementosCarrito = document.querySelector(".contenedorItemsCarrito");
const totalCarrito = document.querySelector(".totalCarrito");

//RENDERIZAR PRODUCTOS

function renderizarProducto() {
    productos.forEach((producto) => {
        elementoProducto.innerHTML +=
            `
        <div class="contenido d-flex flex-column">

            <img class="imagenProducto" src="${producto.imagenProducto}">
            <h3 class="titulo" >${producto.titulo}</h3>
            <p class="desc">${producto.desc}</p>
            <h6 class="precio">${producto.precio}</h6>
            <ul>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star checked"></i></li>
                <li><i class="fa fa-star checked"></i></li>

            </ul>
            <button class="boton" onclick="agregarAlCarrito(${producto.id})">
            Agregar al Carrito
        </button>
        </div>`

    })

}
renderizarProducto();

//ARRAY CARRITO
let carrito = JSON.parse(localStorage.getItem("CARRITO")) || [];
actualizarCarrito();


//AGREGAR AL CARRITO

function agregarAlCarrito(id) {

    //REVISA SI ELPRODUCTO YA ESTÁ EN ELCARRITO
    if (carrito.some((item) => item.id === id)) {
     cambiarUnidades("plus", id)
    } else {

        const item = productos.find((producto) => producto.id === id)
        carrito.push({
            ...item,
            cantidad: 1
        });


    }
    actualizarCarrito();
}
//ACTUALIZA EL CARRITO

function actualizarCarrito() {

    renderizarItemsCarrito();
    renderizarTotal();

    //GUARDA EL CARRITO  EN EL LOCALSTORAGE
    localStorage.setItem("CARRITO", JSON.stringify(carrito))
}

//RENDERIZA LOS ITEMS DEL CARRITO
function renderizarItemsCarrito() {
    elementosCarrito.innerHTML = "";
    carrito.forEach((item) => {

        elementosCarrito.innerHTML +=
            `<div class="row itemsCarrito">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <img src=${item.imagenProducto} class="shopping-cart-image">
            <h6 class="shopping-cart-item-title tituloItemCarrito text-truncate ml-3 mb-0">${item.titulo}</h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 precioItemCarrito">${item.precio}</p>
        </div>
    </div>
    <div class="col-4 ">
        <div class="units d-flex flex-row">
        <div class="btn minus" onclick="cambiarUnidades('minus', ${item.id})">-</div>
        <div class="number">${item.cantidad}</div>
     <div class="btn plus" onclick="cambiarUnidades('plus', ${item.id})">+</div>
     <button class="btn btn-danger botonBorrar" onclick="removerItem(${item.id})"type="button">X</button>          
    </div>
        <div>
            
        </div>
    </div>
</div>`

    })
}
//CAMBIAR NUMERO DE UNIDADES

function cambiarUnidades(action, id) {

    carrito = carrito.map((item) => {

        let cantidad = item.cantidad;
        if (item.id === id) {
            if (action === "minus" && cantidad>1) {
                cantidad--;
            } else if (action === "plus") {
                cantidad++;
            }
        }
        return{
            ...item,
            cantidad,

        }
    })

    actualizarCarrito();
}

//CALCULA EL TOTAL
function renderizarTotal(){

    let precioTotal = 0;
    let itemsTotales = 0;

    carrito.forEach((item)=>{

        precioTotal+= item.precio * item.cantidad;
        itemsTotales+= item.cantidad;


    });
    totalCarrito.innerHTML = `Total (${itemsTotales} items): $${precioTotal}`;

}

//REMOVER ITEMS DEL CARRITO

function removerItem(id){
   carrito= carrito.filter ((item)=> item.id !== id)
    actualizarCarrito();
}

//FETCH

const dolar=document.querySelector(".dolar")
fetch('/js/dolar.json')
.then(resp=>resp.json())
.then(data=>dolar.innerHTML=`TOMAMOS DOLARES AL PRECIO DEL DIA. LA COTIZACIÓN ACTUAL ES DE ${data.precio}`)