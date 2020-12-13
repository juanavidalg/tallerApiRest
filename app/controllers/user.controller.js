const User = require('../models/user.model.js');
const Car = require('../models/car.model.js');

exports.create = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "No se encontraron datos en el request"
        });
    }
       
    const user = new User({
        mail: req.body.mail,
        pass: req.body.pass,
        name: req.body.name,
        lastname: req.body.lastname
    });

    user.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " -- Error de almacenamiento."
        });
    });
};

exports.loginUser = (req, res) => {
    User.find({mail:req.body.mail, pass:req.body.pass}).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Item no encontrado:" + req.body.mail
            });
        }

        res.status(200).send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item con id no encontrado:" + req.body.mail
            });
        }

        return res.status(500).send({
            message: "Error en la consulta del Item:" + req.body.mail
        });
    });
};

exports.totalPayUser = (req, res) => {
    //Consulta
    Car.find({user:req.params.id}).then(cars => {
        
        var total = 0;

        cars.forEach(function(car) {
            total = total + car.price;
        });
        
        res.status(200).send({total:total});
    }).catch(err => {
        res.status(500).send({
        message: err.message || " -- Error en la consulta."});
    });
};

exports.pay = (req, res) => {
    //Actualizar selección de platos
    Car.update({user:req.params.id}, {
        state: "PAGADO"
    },{ 
        new: true 
    }).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Item con id no encontrado:" + req.params.id
            });
        }

        res.status(200).send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item con id no encontrado:" + req.params.id
            });
        }

        return res.status(500).send({
            message: "Ocurrio un error en la actualización de datos:" +req.params.id
        });
    });
};

//Borrado de plato de una carrito
exports.deletePlate = (req, res) => {
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
            message: "Error en la eliminación del item:" + req.params.id
        });
    });
};
