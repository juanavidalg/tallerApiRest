const Product = require('../models/product.model.js');

//Creación de un nuevo producto
exports.create = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "No se encontraron datos en el request"
        });
    }
       
    const product = new Product({
        name: req.body.name,
        price: req.body.price || 0,
        expiration: req.body.expiration || null
    });

    product.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " -- Error de almacenamiento."
        });
    });
};

//Lista de todos los productos
exports.findAll = (req, res) => {
    Product.find().then(products => {
        res.status(200).send(products);
    }).catch(err => {
        res.status(500).send({
        message: err.message || " -- Error en la consulta."});
    });
};

//Busqueda de uno de los productos
exports.findOne = (req, res) => {
    Product.findById(req.params.id).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Producto no encontrado:" + req.params.id
            });
        }

        res.status(200).send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Producto con id no encontrado:" + req.params.id
            });
        }

        return res.status(500).send({
            message: "Error en la consulta del producto:" + req.params.id
        });
    });
};

//Actualización de producto
exports.update = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "No se encontraron datos en la solicitud"
        });
    }
    
    Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price || 0,
        expiration: req.body.expiration || null
    },{ 
        new: true 
    }).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Producto con id no encontrado:" + req.params.id
            });
        }

        res.status(200).send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Producto con id no encontrado:" + req.params.id
            });
        }

        return res.status(500).send({
            message: "Ocurrio un error en la actualización de datos:" +req.params.id
        });
    });
};

//Borrado de producto
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Producto no encontrado:" + req.params.id
            });
        }

        res.status(200).send({message: "Producto eliminado"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Producto no encontrado:" + req.params.id
            });
        }

        return res.status(500).send({
            message: "Error en la eliminación del producto:" + req.params.id
        });
    });
};
