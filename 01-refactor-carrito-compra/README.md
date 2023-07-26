# Kata de Refactorización: Cálculo del precio total de una compra

Este es un ejercicio de kata de refactorización diseñado para practicar habilidades de programación y mejorar la calidad del código aplicando los principios SOLID. El objetivo de esta kata es refactorizar un código existente que calcula el precio total de una compra en un carrito, con el enfoque de mejorar el diseño y la estructura del código.

## Planteamiento

El código proporcionado inicialmente contiene una implementación básica del cálculo del precio total de una compra en un carrito de compras. Sin embargo, no sigue completamente los principios SOLID y podría beneficiarse de una refactorización.

Tu objetivo es refactorizar el código existente para mejorar su diseño y adherirse a los principios SOLID. Se espera que apliques alguno de los principios de Responsabilidad Única (SRP), Abierto/Cerrado (OCP), Sustitución de Liskov (LSP), Segregación de Interfaces (ISP) y Dependencia Inversa (DIP). Considera cómo se pueden aplicar estos principios para lograr un código más modular, flexible y fácil de mantener.

## Instrucciones

1. Lee el código existente y familiarízate con su estructura y funcionalidad.
2. Identifica las áreas del código que no cumplen con los principios SOLID y que podrían beneficiarse de una refactorización.
3. Piensa en diferentes estrategias y enfoques para aplicar los principios SOLID al código. Considera cómo dividir responsabilidades, desacoplar dependencias y permitir extensiones futuras.
4. Comienza a refactorizar el código, implementando las modificaciones necesarias para aplicar los principios SOLID.
5. Compara el código refactorizado con el código original y observa las mejoras realizadas en términos de diseño, modularidad y mantenibilidad. (Justifica tu respuesta)

## Ejemplo de uso

A continuación se muestra un ejemplo básico de cómo se usa el código actual:

```typescript
const carrito = new CarritoDeCompras();
carrito.agregarProducto(new Producto("Producto 1", 10));
carrito.agregarProducto(new Producto("Producto 2", 20));
carrito.agregarProducto(new Producto("Producto 3", 30));

console.log("Precio total:", carrito.calcularPrecioTotal());
