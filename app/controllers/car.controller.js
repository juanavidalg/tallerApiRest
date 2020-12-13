const Car = require('../models/car.model.js');

exports.create = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "No se encontraron datos en el request"
        });
    }
       
    const car = new Car({
        user: req.body.user,
        plate: req.body.plate,
        price: req.body.price,
        name: req.body.name,
        state: "EN_PROCESO"
    });

    car.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " -- Error de almacenamiento."
        });
    });
};

exports.delete = (req, res) => {
    Car.findByIdAndRemove(req.params.id).then(car => {
        if(!car) {
            return res.status(404).send({
                message: "Item no encontrado:" + req.params.id
            });
        }

        res.status(200).send({message: "Item eliminado"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Item no encontrado:" + req.params.id
            });
        }

        return res.status(500).send({
            message: "Error en la eliminación del Item:" + req.params.id
        });
    });
};