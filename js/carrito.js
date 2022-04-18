const carrito = validarStorage();

function validarStorage() {
    if (localStorage.getItem("carrito") != null) {
        const storageProd = JSON.parse(localStorage.getItem("carrito"));
        return storageProd;
    } else {
        return [];
    }
}


const BotonAgregarAlCarrito = document.querySelectorAll('.boton');
BotonAgregarAlCarrito.forEach(AgregarAlCarrito => {
    AgregarAlCarrito.addEventListener('click', agregarAlCarritoClickeado);
});
const contenedorItemsCarrito = document.querySelector('.contenedorItemsCarrito');


function agregarAlCarritoClickeado(event) {

    const boton = event.target;
    const contenido = boton.closest('.contenido');

    const titulo = contenido.querySelector('.titulo').textContent;
    const precio = contenido.querySelector('.precio').textContent;
    const imagen = contenido.querySelector('.imagenProducto').src;

    agregarItemAlCarrito(titulo, precio, imagen);

}


function agregarItemAlCarrito(titulo, precio, imagen) {

    const tituloItemCarrito = contenedorItemsCarrito.getElementsByClassName('tituloItemCarrito');
    for (let i = 0; i < tituloItemCarrito.length; i++) {
        if (tituloItemCarrito[i].innerText === titulo) {
            let cantidadElementos = tituloItemCarrito[i].parentElement.parentElement.parentElement.querySelector('.cantidadItemCarrito');
            cantidadElementos.value++;
            actualizarTotalCarrito();
            return;
        }
    }
    



    const filaCarrito = document.createElement('div');
    const contenidoCarrito = `<div class="row itemsCarrito">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <img src=${imagen} class="shopping-cart-image">
            <h6 class="shopping-cart-item-title tituloItemCarrito text-truncate ml-3 mb-0">${titulo}</h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 precioItemCarrito">${precio}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input cantidadItemCarrito" type="number"
                value="1">
            <button class="btn btn-danger botonBorrar" type="button">X</button>
        </div>
    </div>
</div>`;

    filaCarrito.innerHTML = contenidoCarrito;
    contenedorItemsCarrito.append(filaCarrito);

    filaCarrito.querySelector('.botonBorrar').addEventListener('click', removerItemCarrito);

    filaCarrito.querySelector('.cantidadItemCarrito').addEventListener('change', cantidadCambiada);

    actualizarTotalCarrito();
}

function actualizarTotalCarrito() {
    let total = 0;
    const totalCarrito = document.querySelector('.totalCarrito');
    const itemsCarrito = document.querySelectorAll('.itemsCarrito');

    itemsCarrito.forEach((itemsCarrito) => {
        const precioElementoItemCarrito = itemsCarrito.querySelector('.precioItemCarrito');
        const precioItemCarrito = Number(precioElementoItemCarrito.textContent.replace('$', ''));

        const cantidadElementoItemCarrito = itemsCarrito.querySelector('.cantidadItemCarrito');
        const cantidadItemCarrito = Number(cantidadElementoItemCarrito.value);
        total = total + precioItemCarrito * cantidadItemCarrito;


    });

    totalCarrito.innerHTML = `${total}$&nbsp;`;
}

function removerItemCarrito(event) {

    const botonApretado = event.target;
    botonApretado.closest('.itemsCarrito').remove();
    actualizarTotalCarrito();


}

function cantidadCambiada(event) {

    const input = event.target;
    if (input.value <= 0) {
        input.value = 1;
    }
    actualizarTotalCarrito();
}

/*localstorage*/
localStorage.setItem("carrito", JSON.stringify(carrito));