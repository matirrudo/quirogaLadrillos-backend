const {model, Schema} = require('mongoose')

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    weight: Number,
    imageUrl: String
})

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Product = model('Product', productSchema)
/*
Product.find({}).then(result =>{
    console.log(result);
    mongoose.connection.close()
})


const product = new Product({
    name: "Ladrillo chico",
    description: "Descripcion de ladrillos chicos",
    price: 20,
    weight: 1400
})

product.save().then(result => {
    console.log(result);
    mongoose.connection.close()
})
.catch(err => {
    console.error(err);
})
*/

module.exports = Product
