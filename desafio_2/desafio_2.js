const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.lastProductId = 0;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        this.lastProductId = this.products[this.products.length - 1].id;
      }
    } catch (error) {
      console.log("Error loading products:", error);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log("Products saved.");
    } catch (error) {
      console.log("Error saving products:", error);
    }
  }

  addProduct(productData) {
    if (
      !productData.title ||
      !productData.description ||
      !productData.price ||
      !productData.thumbnail ||
      !productData.code ||
      !productData.stock
    ) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    if (this.products.some(product => product.code === productData.code)) {
      console.error("El código del producto ya está en uso.");
      return;
    }

    const newProduct = {
      id: ++this.lastProductId,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      thumbnail: productData.thumbnail,
      code: productData.code,
      stock: productData.stock
    };

    this.products.push(newProduct);
    this.saveProducts();
    console.log("Producto agregado:", newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado.");
    }
  }

  updateProduct(id, fieldToUpdate, newValue) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      product[fieldToUpdate] = newValue;
      this.saveProducts();
      console.log("Producto actualizado:", product);
    } else {
      console.error("Producto no encontrado.");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProducts();
      console.log("Producto eliminado:", deletedProduct);
    } else {
      console.error("Producto no encontrado.");
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager('products.json');

productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 19.99,
  thumbnail: "ruta/imagen1.jpg",
  code: "P123",
  stock: 10
});

productManager.updateProduct(1, 'price', 24.99);

productManager.deleteProduct(1);

console.log("Todos los productos:", productManager.getProducts());