const Product = require("../../models/product.model")

const productHelper = require("../../helpers/product")

// [GET] /
module.exports.index = async (req, res) => {
    // Lấy ra sản phẩm nổi bật 

    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(1)

    const newProductsFeatured = productHelper.priceNewProducts(productsFeatured) 

    // Hết lấy ra sản phẩm nổi bật
    
    // Hiển thị danh sách sản phẩm mới nhất

    const productsNew =  await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(10)

    const newProductsNew = productHelper.priceNewProducts(productsNew) 

     // Hết hiển thị danh sách sản phẩm mới nhất


    // console.log(productsFeatured);
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew    
    })
}
