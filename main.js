// =======================================================
// ETAPA 7: MODELO DE DATOS DE PRODUCTOS (FABRICACIONES LÓPEZ)
// =======================================================

// Lista inteligente de tus muebles en acero inoxidable
const misProductos = [
    {
        id: "mesa-industrial-01",
        nombre: "Mesa de Trabajo Industrial",
        descripcion: "Mesa reforzada con entrepaño, ideal para preparación de alimentos.",
        precio: 150000, 
        categoria: "mesas",
        imagen: "../img/mesa.jpg",
        entregaInmediata: false
    },
    {
        id: "plancha-industrial-01",
        nombre: "Plancha Industrial",
        descripcion: "Acero inoxidable de alta resistencia, quemadores de alta potencia.",
        precio: 180000,
        categoria: "cocina",
        imagen: "../img/plancha.jpg",
        entregaInmediata: true
    },
    {
        id: "freidora-industrial-01",
        nombre: "Freidora Industrial",
        descripcion: "Capacidad industrial, lista para entrega inmediata.",
        precio: 220000,
        categoria: "cocina",
        imagen: "../img/freidora.jpg",
        entregaInmediata: true
    },
    {
        id: "fregadero-industrial-01",
        nombre: "Fregadero de una Poceta",
        descripcion: "Fregadero profundo de gran tamaño para lavado rápido.",
        precio: 135000,
        categoria: "fregaderos",
        imagen: "../img/fregadero.jpg",
        entregaInmediata: false
    }
];

// =======================================================
// INTERACTIVIDAD DEL CARRITO (ACTUALIZADO PARA PRUEBAS LOCALES)
// =======================================================

let contadorCarrito = 0;
const carritoNumero = document.querySelector('.carrito span');
const botonesAgregar = document.querySelectorAll('.producto button');

botonesAgregar.forEach((boton, indice) => {
    boton.addEventListener('click', () => {
        // 1. Aumentamos el contador visual
        contadorCarrito++;
        carritoNumero.innerText = contadorCarrito;
        
        // 2. Simulamos que el backend detecta cuál producto se tocó usando el índice
        // El primer botón maneja el producto 1 (Plancha), el segundo el producto 2 (Freidora)
        // Como en la lista 'misProductos' la Plancha está en la posición 1 y la Freidora en la 2:
        const productoSeleccionado = misProductos[indice + 1]; 
        
        // 3. Pasamos el precio por nuestra función del backend (Fase 8)
        const recibo = calcularTotalConIVA(productoSeleccionado.precio);
        
        // 4. Imprimimos el flujo completo en la consola para la prueba local
        console.clear(); // Limpia la consola anterior para ver solo la última compra
        console.log("=== ¡PRUEBA DE FLUJO DE COMPRA EXITOSA! ===");
        console.log("Cliente agregó: " + productoSeleccionado.nombre);
        console.log("Subtotal: ₡" + recibo.subtotal.toLocaleString('es-CR'));
        console.log("IVA (13%): ₡" + recibo.iva.toLocaleString('es-CR'));
        console.log("Total Cargado al Carrito: ₡" + recibo.total.toLocaleString('es-CR'));
        console.log("Artículos totales en carrito: " + contadorCarrito);
    });
});
// =======================================================
// ETAPA 8: BACKEND SIMULADO (CÁLCULO DE PEDIDOS E IVA 13%)
// =======================================================

// Esta función simula al backend calculando el impuesto de un mueble
function calcularTotalConIVA(precioBase) {
    const porcentajeIVA = 0.13; // 13% de IVA en Costa Rica
    const montoIVA = precioBase * porcentajeIVA;
    const precioTotal = precioBase + montoIVA;

    // Devolvemos los datos ordenados en un bloque para usarlos luego
    return {
        subtotal: precioBase,
        iva: montoIVA,
        total: precioTotal
    };
}

// EJEMPLO DE PRUEBA EN CONSOLA:
// Vamos a probar qué pasa si un cliente quiere comprar la Plancha Industrial (180,000 colones)
const precioDePlancha = misProductos[1].precio; 
const reciboSimulado = calcularTotalConIVA(precioDePlancha);

// Esto imprimirá el desglose oculto en la consola de tu navegador para revisar que el "cerebro" calcule bien
console.log("--- BACKEND: PROCESANDO DETALLE DE COMPRA ---");
console.log("Subtotal (Precio Mueble): ₡" + reciboSimulado.subtotal);
console.log("IVA (13%): ₡" + reciboSimulado.iva);
console.log("Total a Pagar: ₡" + reciboSimulado.total);

// =======================================================
// ETAPA 9: SIMULACIÓN DE ALMACENAMIENTO (BASE DE DATOS LOCAL)
// =======================================================

// Guardamos nuestra lista de muebles en el almacenamiento del navegador transformándola en texto
localStorage.setItem('productos_lopez', JSON.stringify(misProductos));

// Para demostrar que quedó guardado, vamos a "leer" la base de datos simulada
const datosGuardados = localStorage.getItem('productos_lopez');
const productosDesdeBD = JSON.parse(datosGuardados);

console.log("--- BASE DE DATOS: DATOS RECUPERADOS CON ÉXITO ---");
console.log(productosDesdeBD);

// =======================================================
// ETAPA 11: CAPA DE SEGURIDAD Y VALIDACIÓN
// =======================================================

// Esta función valida que el ID del producto exista y sea seguro antes de procesar nada
function validarProductoSeguro(idProducto) {
    // Buscamos si el ID que viene del botón coincide con un producto real de nuestra lista
    const existe = misProductos.some(producto => producto.id === idProducto);
    
    if (!existe) {
        console.error("¡ALERTA DE SEGURIDAD! Se intentó procesar un producto inexistente o alterado.");
        return false;
    }
    
    console.log("Validación de seguridad: Producto verificado y seguro. ✅");
    return true;
}

// PRUEBA DE SEGURIDAD SIMULADA:
// Validamos un producto real
validarProductoSeguro("plancha-industrial-01");
// Validamos un intento de hackeo o error
validarProductoSeguro("mueble-falso-hackeo");