module.exports = (app) => {
    const car = require('../controllers/car.controller.js');
    
    app.post('/car', car.create);
    app.delete('/car/:id', car.delete);
}
   
