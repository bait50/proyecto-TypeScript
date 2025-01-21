import * as readline from 'readline';

// Definición de interfaces, son básicamente un contrato que define la estructura de un objeto 
// es decir, que son como clases pero sin métodos, solo propiedades 

export interface Producto {
    nombre: string;
    precio: number;
    stock: number;
    estado: boolean;
}

interface Categoria {
    nombre: string;
    productos: Producto[];
}

interface Tienda {
    id: number;
    nombre: string;
    categorias: Categoria[];
}

// Array de tiendas con tipado 

const tiendas: Tienda[] = [
    {
        id: 1,
        nombre: "San Juan",
        categorias: [
            {
                nombre: "Electrónica",
                productos: [
                    { nombre: "TV", precio: 1599.99, stock: 10, estado: true },
                    { nombre: "Radio", precio: 49.99, stock: 25, estado: true },
                    { nombre: "Teléfono", precio: 699.99, stock: 15, estado: false },
                ],
            },
            {
                nombre: "Ropa",
                productos: [
                    { nombre: "Camiseta", precio: 19.99, stock: 50, estado: true },
                    { nombre: "Pantalón", precio: 39.99, stock: 30, estado: true },
                    { nombre: "Zapatos", precio: 89.99, stock: 20, estado: false },
                ],
            },
        ],
    },
    {
        id: 2,
        nombre: "Santa Marta",
        categorias: [
            {
                nombre: "Electrónica",
                productos: [
                    { nombre: "TV", precio: 1699.99, stock: 8, estado: true },
                    { nombre: "Radio", precio: 59.99, stock: 20, estado: true },
                    { nombre: "Teléfono", precio: 799.99, stock: 12, estado: true },
                ],
            },
            {
                nombre: "Ropa",
                productos: [
                    { nombre: "Camiseta", precio: 14.99, stock: 60, estado: true },
                    { nombre: "Pantalón", precio: 49.99, stock: 25, estado: false },
                    { nombre: "Zapatos", precio: 99.99, stock: 15, estado: true },
                ],
            },
        ],
    },
];



// Función para buscar productos por nombre en todas las tiendas 
const buscarProducto = (nombreProducto: string): void => {

    tiendas.forEach((tienda: Tienda) => {
        tienda.categorias.forEach((categoria: Categoria) => {
            categoria.productos.forEach((producto: Producto) => {
                if (producto.nombre.toLowerCase() === nombreProducto.toLowerCase() && producto.estado) {
                    console.log(` 
                        Producto encontrado en tienda: ${tienda.nombre} 
                        Categoría: ${categoria.nombre} 
                        Precio: ${producto.precio.toFixed(2)} Pesos 
                        Stock: ${producto.stock} 
                    `);
                }
            });
        });
    });
};

// Interfaz para leer datos del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para mostrar el menú principal
function mostrarMenu() {
    console.log('\n=== MENÚ PRINCIPAL ===');
    console.log('1. Buscar producto');
    console.log('2. Mostrar todas las tiendas');
    console.log('3. Mostrar todas las tiendas, categorías y productos');
    console.log('4. Salir');
    
    rl.question('Seleccione una opción: ', (opcion) => {
        switch(opcion) {
            case '1':
                rl.question('Ingrese el nombre del producto a buscar: ', (nombre) => {
                    buscarProducto(nombre);
                    mostrarMenu();
                });
                break;
            case '2':
                tiendas.forEach(tienda => {
                    console.log(`Tienda: ${tienda.nombre} (ID: ${tienda.id})`);
                });
                mostrarMenu();
                break;
            case '3':
                
                 // funcion para mostrar todas las tiendas, categorias y productos
                tiendas.forEach((tienda: Tienda) => {
                    console.log(`Tienda: ${tienda.nombre} (ID: ${tienda.id})`);
                    tienda.categorias.forEach((categoria: Categoria) => {
                        console.log(`  Categoría: ${categoria.nombre}`);
                        categoria.productos.forEach((producto: Producto) => {
                            console.log(`    Producto: ${producto.nombre}`);
                            console.log(`      Precio: ${producto.precio.toFixed(2)} Pesos`);
                            console.log(`      Stock: ${producto.stock}`);
                            console.log(`      Estado: ${producto.estado ? "Activo" : "Inactivo"}`);
                        });
                    });
                });
                mostrarMenu();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Opción inválida');
                mostrarMenu();
        }
    });
}

mostrarMenu();