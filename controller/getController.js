/* Middleware is a function and it has access to req and rep object
it can do following:
* Execute any code
* Make any changes to req and res object
* End the req-res cycle
* call the next middleware in the stack(next())
*/
const getController = {};
getController.getRequest = (req, res, next) => {
  //res.send('This is your server');
 next();
};

module.exports = getController;