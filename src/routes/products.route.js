const { application } = require('express');
const express = require('express');
const handleErrors = require('../middlewares/handleErrors');
const router = express.Router();
const Product = require('../models/Product')

router.get('/products', (request, response) => { 
    Product.find({}).then(products => {
        response.json(products)
    })
});

router.get('/products/:id', (request, response,next) => {
    const{id} = request.params

    Product.findById(id).then(product =>{
        if(product){
            return response.json(product)
        }else{
            response.status(404).end()
        }
    }).catch(err => next(err))
})

router.post('/products', (request, response) => {
    const product = request.body
    console.log(product)
    const newProduct = new Product({
        name: product.name,
        description: product.description,
        price: product.price,
        weight: product.weight,
        imageUrl: product.imageUrl
    })
    
    newProduct.save().then(savedProduct => {
        response.json(savedProduct)
    })
})

router.delete('/products/:id',(request, response, next) => {
    const {id} = request.params
    Product.findByIdAndRemove(id).then(() => {
        response.status(204).end()
    }).catch(error => next(error)) // si hay un error se va al siguiente middleware y buscara hasta que encuentre al proximo que tenga un error como primer parametro
})

router.put('/products/:id',(request,response, next) => {
    const{id} = request.params 
    const product = request.body
    const newProductInfo = {
        name: product.name,
        description: product.description,
        price: product.price,
        weight: product.weight,
        imageUrl: product.imageUrl
    }
    Product.findByIdAndUpdate(id,newProductInfo,{new:true}).then(result => { //se especifica que traiga al documento actualizado
        response.json(result)
    }).catch(err => next(err))
})

router.use(handleErrors)


/*
router.post('/products', (req, res) => { 
    const { name, description, weight, price } = req.body; 
    let sql = 'INSERT INTO products(name, description, weight, price) VALUES (?,?,?,?)';
    var valores = [name, description, weight, price]; 
    mysqlConnection.query(sql, valores, (err, rows, fields) => {
        if (!err) { 
            res.json({ ok: true }); 
        } else { 
         console.log(err); 
        }
    });
}); 

// Update un product 
router.put('/products/:id', (request, response) => { 
    const id = request.params.id; 
    const { name, description, weight, price } = req.body; 
    let sqlQuery = 'UPDATE obstacles SET name = ?, description = ?, weight = ?, price = ? WHERE id=' + id; mysqlConnection.query(sqlQuery, [name, description, weight, price], (err, rows, fields) => { 
        if (!err) { 
            response.json({ ok: true }); 
        } else { 
            console.log(err); 
        } 
    }); 
}); 

*/

module.exports = router; 