const Product = require("../../models/product.model")

const createTreeHelper = require("../../helpers/createTree");   
const productHelper = require("../../helpers/product")

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    })
    
    
    // console.log(products);
    
    const newProducts = productHelper.priceNewProducts(products);


    res.render("client/pages/products/index", {
        pageTitle: "Trang sản phẩm",
        products: newProducts,
    })
}


// [GET] /detail/:slug
module.exports.detail = async (req, res) => {

    try {
        const find = {
            deleted: false,
            slug: req.params.slug
        }
    
        const product = await Product.findOne(find)
        
    
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        }) 
    } catch (error) {
        req.flash("error", `Không tồn tại sản phẩm này!`)

        res.redirect(`/products`)
    }

 
}


