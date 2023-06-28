const Routes = require('../utils/constant.js');
const controller = require('../controllers/users.controller.js');

module.exports = (app) =>{
    app.post(Routes.sign_up, controller.insertUser);
    app.post(Routes.sign_in, controller.getUser);
    app.post(Routes.forget, controller.forgetPass);
    app.get(Routes.matchOtp, controller.matchOtp);
    app.post(Routes.updatePass, controller.updatePassword);
    app.get(Routes.getProfile, controller.userProfile);
    app.put(Routes.updateProfile, controller.updateProfile);
}