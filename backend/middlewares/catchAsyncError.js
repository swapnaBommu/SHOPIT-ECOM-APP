//this function accept controller function as parameter and return another function 
// that function return a promise and it will invoke the controller function 
//if there is any error in that function it catch that error pass it to next middleware
export default (controllerFunction) => (req, res, next) =>
Promise.resolve(controllerFunction(req, res, next)).catch(next);