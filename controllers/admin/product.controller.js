const Product = require("../../models/product.model")

const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    
    // console.log(req.query.status);
    
    const filterStatus = filterStatusHelper(req.query)

    // console.log(filterStatus);

    let find = {
        deleted: false
    }

    if(req.query.status) {
        find.status = req.query.status;
    }

    // Tìm kiếm
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex) {
        find.title = objectSearch.regex
    }

    const products = await Product.find(find);

    // console.log(products);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword 
    })
}   