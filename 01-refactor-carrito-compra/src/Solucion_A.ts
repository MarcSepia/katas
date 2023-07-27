interface Descuento {
    aplicarDescuento(precio: number): number
}

class DescuentoFijo implements Descuento {
    descuento: number
    constructor(descuento: number) {
        this.descuento = descuento
    }

    aplicarDescuento(precio: number): number {
        return precio - this.descuento
    }
}

class DescuentoPorcentual implements Descuento {
    descuento: number
    constructor(descuento: number) {
        this.descuento = descuento
    }

    aplicarDescuento(precio: number): number {
        return precio - (precio * this.descuento)
    }
}

export class Producto {
    descuentos: Descuento[]
    constructor(public nombre: string, public precio: number) {
        this.descuentos = []
    }

    getPrecio() {
        let precio = this.precio

        this.descuentos.forEach(descuento => {
            const precioDescontado = descuento.aplicarDescuento(precio)
            precio = precioDescontado
        })

        return precio
    }

    añadirDescuento(descuento: Descuento) {
        this.descuentos.push(descuento)
    }
}

export class CarritoCompra {
    private productos: Producto[] = [];
    private descuentoGeneral: Descuento = new DescuentoFijo(0)

    agregarProducto(producto: Producto) {
        this.productos.push(producto);
    }

    calcularPrecioTotal() {
        let precioTotal = 0;

        this.productos.forEach((producto) => {
            precioTotal += producto.getPrecio();
        });

        if (this.descuentoGeneral) {
            const precioDescontado = this.descuentoGeneral.aplicarDescuento(precioTotal)
            precioTotal = precioDescontado
        }

        return precioTotal;
    }

    setDescuento(descuento: Descuento) {
        this.descuentoGeneral = descuento
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