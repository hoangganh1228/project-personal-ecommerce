const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/createTree")
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""

        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""

        },
    ]
    
    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status)
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active";
    }

    let find = {
        deleted: false,
    };

    if(req.query.status) {
        find.status = req.query.status;
    }

    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);

    

    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords,
        filterStatus: filterStatus
    });
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