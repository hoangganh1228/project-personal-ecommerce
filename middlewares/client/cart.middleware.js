const Cart = require("../../models/cart.model")

module.exports.cartId = async (req, res, next) => {
    if(!req.cookies.cartId) {
        // Tạo giỏ hàng
        const cart = new Cart(); 
        await cart.save();
        
        const expiresCookie = 1000 * 60 * 60 * 24 * 365;

        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expiresCookie)
        })
    } else {
        // Lấy ra thôi 

    }

    next();
}