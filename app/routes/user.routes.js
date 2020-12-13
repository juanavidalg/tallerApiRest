module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    app.post('/user', user.create); 

    app.post('/user/login', user.loginUser);   

    app.get('/user/total-pay/:id', user.totalPayUser);

    app.put('/user/pay/:id', user.pay);

    app.delete('/user/plate/:idPlate', user.deletePlate);
}
   