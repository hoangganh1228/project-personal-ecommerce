const Role = require("../../models/role.model")
const systemConfig = require("../../config/system");


// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }

    const records = await Role.find(find)

    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records
    })
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {

    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo nhóm quyền ",
    });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    const records = new Role(req.body);
    await records.save();
    
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}
