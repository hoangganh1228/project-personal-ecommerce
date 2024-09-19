const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model");

const createTreeHelper = require("../../helpers/createTree");   
const productsHelper = require("../../helpers/product")
const productsCategoryHelper = require("../../helpers/products-category");
// [GET] /products
module.exports.index = async (req, res) => {
    // Sort

    let sort = {};

    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    else {

        sort.position = "desc"
    } 

    // End Sort

    let find = {
        status: "active",
        deleted: false
    }

    

    const products = await Product.find(find)
    .sort(sort);
    
    
    


    // console.log(products);
    
    const newProducts = productsHelper.priceNewProducts(products);

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
            slug: req.params.slugProduct,
        }
    
        const product = await Product.findOne(find)
        

        if(product.product_category_id) {
            const category = await ProductCategory.findOne({
              _id: product.product_category_id,
              status: "active",
              deleted: false
            });
  
            product.category = category;
          }
          

          product.priceNew = productsHelper.priceNewProduct(product);

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        }) 
    } catch (error) {
        req.flash("error", `Không tồn tại sản phẩm này!`)

        res.redirect(`/products`)
    }

 
}

// [GET] /detail/:slugCategory
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
        }).sort({ position: "desc" });
        
        const newProducts = productsHelper.priceNewProducts(products);
        
        res.render("client/pages/products/index", {
            pageTitle: category.title,
            products: newProducts,
        })
    } catch (error) {
        res.redirect(`/products`)
    }
    
}



