module.exports = (app) => {
    const restaurant = require('../controllers/restaurant.controller.js');

    app.post('/restaurants', restaurant.create);
    app.get('/restaurants', restaurant.findAll);
}