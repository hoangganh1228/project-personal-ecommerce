const categoryMiddleware =  require("../../middlewares/client/category.middleware");
const cartMiddleware =  require("../../middlewares/client/cart.middleware");

const homeRoutes = require("./home.route");
const productRocutes = require("./product.route");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route");


module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    
    app.use("/", homeRoutes)

    app.use("/products", productRocutes)

    app.use("/search", searchRoutes)

    app.use("/cart", cartRoutes)

}