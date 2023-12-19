const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active"
    })

    // console.log(products);



    res.render("client/pages/products/index", {
        pageTitle: "Trang sản phẩm",
        products: products
    })
}
