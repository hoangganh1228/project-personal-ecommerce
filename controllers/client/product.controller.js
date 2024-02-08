const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model");

const createTreeHelper = require("../../helpers/createTree");   
const productHelper = require("../../helpers/product")
const productsCategoryHelper = require("../../helpers/products-category");
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

// [GET] /detail/router.get("/:slugCategory", controller.category);
module.exports.category = async (req, res) => {
    try {
        const category = await ProductCategory.findOne({
            slug: req.params.slugCategory,
            deleted: false,
            status: "active"
    
        })

        const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);

  const listSubCategoryId = listSubCategory.map(item => item.id);


        const products = await Product.find({
            product_category_id: { $in: [category.id, ...listSubCategoryId] },
            deleted: false
        }).sort({ positipn: "desc" });
        
        const newProducts = productHelper.priceNewProducts(products);
        
        res.render("client/pages/products/index", {
            pageTitle: category.title,
            products: newProducts,
        })
    } catch (error) {
        res.redirect(`/products`)
    }
    
}



