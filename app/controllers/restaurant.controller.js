const Restaurant = require('../models/restaurant.model.js');

exports.create = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "No se encontraron datos en el request"
        });
    }
       
    const restaurant = new Restaurant({
        code: req.body.code,
        name: req.body.name
    });

    restaurant.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " -- Error de almacenamiento."
        });
    });
};

exports.findAll = (req, res) => {
    Restaurant.find().then(restaurants => {
        res.status(200).send(restaurants);
    }).catch(err => {
        res.status(500).send({
        message: err.message || " -- Error en la consulta."});
    });
};