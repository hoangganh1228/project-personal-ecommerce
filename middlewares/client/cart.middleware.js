const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model");

const productsHelper = require("../../helpers/product");

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
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        })

        if (cart.products.length > 0) {
            for (const item of cart.products) {
                const productId  = item.product_id;
                const productInfo = await Product.findOne({
                    _id: productId,
                }).select("title thumbnail slug price discountPercentage");
    
                productInfo.priceNew = productsHelper.priceNewProduct(productInfo);
    
                item.productInfo = productInfo;
    
                item.totalPrice = productInfo.priceNew * item.quantity;
    
                cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);
            }
        }
    

        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);

        res.locals.miniCart = cart;
    
    }

    next();
}