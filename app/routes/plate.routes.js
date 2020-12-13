module.exports = (app) => {
    const plate = require('../controllers/plate.controller.js');

    app.post('/plate', plate.create);
    app.get('/plates', plate.findAll);
    app.get('/plate/:id', plate.findOne);
    app.get('/plates/restaurant/:idRestaurant', plate.platesRestaurant);    
}
   