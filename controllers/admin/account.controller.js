const md5 = require("md5");

const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")

const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
 

const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    
    const filterStatus = filterStatusHelper(req.query)

    let find = {
        deleted: false,
    }


    if(req.query.status) {
        find.status = req.query.status;
    }

    // Tìm kiếm
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex) {
        find.fullName = objectSearch.regex
    }

    const countAccounts = await Account.countDocuments(find);

    // Pagination
    let objectPagination = {
        currentPage: 1,
        limitItems: 4
    }

    if(req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page)
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    const totalPage = Math.ceil(countAccounts/objectPagination.limitItems); 

    objectPagination.totalPage = totalPage;
    // End Pagination

    const records = await Account.find(find).select("-password -token").limit(objectPagination.limitItems).skip(objectPagination.skip);
 

    for(const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });

        record.role = role;
    }



    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination 
    })
}

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Account.updateOne({_id: id}, {
        deleted: true,
        deletedAt: new Date()
    })

    res.redirect("back")
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    })

    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles
    })
}

// [GET] /admin/accounts/createPost
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    })

    if(emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
        res.redirect("back");
    } else {
        req.body.password = md5(req.body.password);

        const record = new Account(req.body);
        await record.save();

        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }


}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    let find = {
        _id: req.params.id,
        deleted: false
    }
    try {
        const data = await Account.findOne(find);

        const roles = await Role.find({
            deleted: false
        })

        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            roles: roles,
          });
    } catch (error) {
        
    }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id
    const emailExist = await Account.findOne({
        _id: { $ne: id },
        email: req.body.email,
        deleted: false
    });
     
    if(emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
    }
    else {
        if(req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;
        }
    
        await Account.updateOne({_id: id}, req.body)
        
        req.flash("success", "Cập nhật tài khoản thành công!");
        
    }

    res.redirect("back");
    

}   
