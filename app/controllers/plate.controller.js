const Plate = require('../models/plate.model.js');

exports.create = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "No se encontraron datos en el request"
        });
    }
       
    const plate = new Plate({
        restaurant: req.body.restaurant,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    plate.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " -- Error de almacenamiento."
        });
    });
};

exports.findAll = (req, res) => {
    Plate.find().then(plates => {
        res.status(200).send(plates);
    }).catch(err => {
        res.status(500).send({
        message: err.message || " -- Error en la consulta."});
    });
};

exports.findOne = (req, res) => {
    Plate.findById(req.params.id).then(plate => {
        if(!plate) {
            return res.status(404).send({
                message: "Item no encontrado:" + req.params.id
            });
        }

        res.status(200).send(plate);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item con id no encontrado:" + req.params.id
            });
        }

        return res.status(500).send({
            message: "Error en la consulta del Item:" + req.params.id
        });
    });
};

exports.platesRestaurant = (req, res) => {
    Plate.find().then(plates => {
        res.status(200).send(plates);
    }).catch(err => {
        res.status(500).send({
        message: err.message || " -- Error en la consulta."});
    });
};