const express = require('express');
const fs = require('fs');
const ProductManager = require('./productManager');

const app = express();
const PORT = 8080;

const productManager = new ProductManager('productos.json');

app.use(express.json());

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit));
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});