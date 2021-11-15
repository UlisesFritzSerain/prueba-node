const fs = require('fs');
const path = require ('path');
const productsFilePath = path.join(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productosController = {
    // index: (req,res) => res.render ('productos'),
    detalle: (req,res) =>{
        let id= req.params.id;
        let product = products.find(product => product.id == id);
        res.render('detalleProducto', {product});
    },
    carrito: (req,res) => res.render('carrito'),
    showProduct: (req,res) =>{
        let id = req.params.id;
        let category = products.filter(producto => producto.category == id)
        res.render('productSelect', {category})
    },
    showDiscount: (req,res) => {
        let enOferta = products.filter(producto=> producto.discount > 0);
        res.render('ofertas', {enOferta});
    } 
}

module.exports = productosController;