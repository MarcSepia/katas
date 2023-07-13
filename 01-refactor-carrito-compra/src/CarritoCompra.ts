export class Producto {
    constructor(public nombre: string, public precio: number) { }
}

export class CarritoCompra {
    private productos: Producto[] = [];

    agregarProducto(producto: Producto) {
        this.productos.push(producto);
    }

    calcularPrecioTotal() {
        let precioTotal = 0;

        this.productos.forEach((producto) => {
            precioTotal += producto.precio;
        });

        return precioTotal;
    }

    aplicarDescuento(descuento: number) {
        this.productos.forEach((producto) => {
            producto.precio = producto.precio - (producto.precio * descuento);
        });
    }

    eliminarProducto(producto: Producto) {
        const index = this.productos.findIndex((p) => p === producto);
        if (index !== -1) {
            this.productos.splice(index, 1);
        }
    }

    vaciarCarrito() {
        this.productos = [];
    }
}
