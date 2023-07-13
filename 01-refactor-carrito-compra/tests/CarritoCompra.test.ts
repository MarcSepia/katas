import { Producto, CarritoCompra } from '../src/CarritoCompra';

describe('CarritoCompra', () => {
    let carrito: CarritoCompra;
    let producto1: Producto;
    let producto2: Producto;

    beforeEach(() => {
        carrito = new CarritoCompra();
        producto1 = new Producto('Producto 1', 100);
        producto2 = new Producto('Producto 2', 200);
    });

    afterEach(() => {
        carrito.vaciarCarrito();
    });

    it('debería agregar un producto al carrito', () => {
        carrito.agregarProducto(producto1);
        expect(carrito.calcularPrecioTotal()).toBe(100);
    });

    it('debería calcular el precio total correctamente', () => {
        carrito.agregarProducto(producto1);
        carrito.agregarProducto(producto2);
        expect(carrito.calcularPrecioTotal()).toBe(300);
    });

    it('debería aplicar el descuento correctamente', () => {
        carrito.agregarProducto(producto1);
        carrito.agregarProducto(producto2);
        carrito.aplicarDescuento(0.2);
        expect(carrito.calcularPrecioTotal()).toBe(240);
    });

    it('debería eliminar un producto del carrito', () => {
        carrito.agregarProducto(producto1);
        carrito.agregarProducto(producto2);
        carrito.eliminarProducto(producto1);
        expect(carrito.calcularPrecioTotal()).toBe(200);
    });

    it('debería vaciar el carrito', () => {
        carrito.agregarProducto(producto1);
        carrito.agregarProducto(producto2);
        carrito.vaciarCarrito();
        expect(carrito.calcularPrecioTotal()).toBe(0);
    });
});

export default {}