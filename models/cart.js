const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id===id);
            const existingProduct = cart.products[existingProductIndex];
            let updateProduct;
            if (existingProduct){
                updateProduct = { ...existingProduct };
                updateProduct.qty = updateProduct.qty+1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updateProduct;
            } else {
                updateProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updateProduct];
            }
            cart.totalPrice = cart.products.reduce((total, product) => {
                return total + +product.price * product.qty;
            }, 0);
            
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        })
    }
    saveCartToFile() {
        console.log('File Path:', p); // Add this line for debugging
        fs.writeFile(p, JSON.stringify(this.products), err => {
            if (err) {
                console.error('Error writing cart data:', err);
            }
        });
    }
    
}
