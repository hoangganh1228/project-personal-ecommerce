const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    })

    // console.log(products);
    
    const newProducts = products.map(item => {
        item.priceNew = (item.price-(item.price*item.discountPercentage)/100).toFixed(0);
        return item;
    });


    res.render("client/pages/products/index", {
        pageTitle: "Trang sản phẩm",
        products: newProducts
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


