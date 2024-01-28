const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/createTree")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination");


// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query)


    let find = {
        deleted: false,
    };

    if(req.query.status) {
        find.status = req.query.status;
    }

    // Tìm kiếm
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex) {
        find.title = objectSearch.regex
    }

    const countProducts = await ProductCategory.countDocuments(find);

    // Pagination
    // let objectPagination = paginationHelper(
    //     {
    //         currentPage: 1,
    //         limitItems: 4
    //     },
    //     req.query,
    //     countProducts
    // )
    // End Pagination
    const records = await ProductCategory.find(find)

    const newRecords = createTreeHelper.tree(records);

    

    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords,
        filterStatus: filterStatus,
        // pagination: objectPagination 
    });
}

// [PATCH] /admin/products-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await ProductCategory.updateOne({ _id: id }, { status: status })
    
    res.redirect("back") 

}

// [DELETE] /admin/products-category/delete/:id
module.exports.deleteItem = async(req, res) => {
    const id = req.params.id;

    await ProductCategory.updateOne({ _id: id}, {
        deleted: true,
        deletedAt: new Date()
    });
    req.flash('success', `Đã xóa thành công danh mục sản phẩm!`);
    res.redirect("back")
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }


    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords
    });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position == "") {
      const count = await ProductCategory.countDocuments();
      req.body.position = count + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await ProductCategory.findOne({
            _id: id,
            deleted: false
        })

        const records = await ProductCategory.find({
            deleted: false
        });
        
        const newRecords = createTreeHelper.tree(records);


        res.render("admin/pages/products-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`); 
    }
}

// [GET] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.position = parseInt(req.body.position)

    await ProductCategory.updateOne({ _id: id }, req.body);

    res.redirect("back")
 
}

// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
    try {
      const find = {
        deleted: false,
        _id: req.params.id
      };
  
      const productCategory = await ProductCategory.findOne(find);
  
    //   console.log(productCategory);
  
      res.render("admin/pages/products-category/detail", {
        pageTitle: productCategory.title,
        productCategory: productCategory  
      });
    } catch (error) {
  
      res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
  
  }