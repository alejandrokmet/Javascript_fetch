const productosRend = document.querySelector(".galeria");



function renderizarProducto(){

    productos.forEach((producto)=>{

        productosRend.innerHTML +=`
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
            <button class="boton mt-auto">Agregar al Carrito</button>
        </div>`

    } 
    
    )
}
renderizarProducto();