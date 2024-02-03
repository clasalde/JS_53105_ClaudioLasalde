class ProductManager {
  constructor() {
      this.products = [];
      this.nextId = 1;
  }

  addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
          console.log("Todos los campos son obligatorios.");
          return;
      }

      if (this.products.some(p => p.code === product.code)) {
          console.log("Ya existe un producto con este código.");
          return;
      }

      product.id = this.nextId++;
      this.products.push(product);
  }

  getProducts() {
      return this.products;
  }

  getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (product) {
          return product;
      } else {
          console.log("Producto no encontrado.");
      }
  }
}

// Caso de Ejemplo

const producto = new ProductManager();

producto.addProduct({
  title: "Producto 1",
  description: "Esta es la descripción del producto 1",
  price: 19.99,
  thumbnail: "ruta/imagen1.jpg",
  code: "ABC123",
  stock: 10
})

producto.addProduct({
title: "Producto 2",
description: "Esta es la descripción del producto 2",
price: 29.99,
thumbnail: "ruta/imagen2.jpg",
code: "DEF456",
stock: 15
});

const allProducts = producto.getProducts();
console.log(allProducts);

const productById = producto.getProductById(2);
console.log(productById);

const nonExistentProduct = producto.getProductById(19); // Esto mostrará "Producto no encontrado." en consola