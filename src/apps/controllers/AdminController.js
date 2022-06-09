

/**
* @param {*} req : Request
* @param {*} res : Response
*/
class AdminController {
    // [GET] /admin
    index(req, res) {

        return res.render('admin/index', {
            title: 'Trang Chủ Quản Trị'
        })
    }
    // [GET] /admin/profile
    profile(req, res) {
        
        return res.render('admin/index', {
            title: 'Trang Chủ Quản Trị'
        })
    }
    
    user(req, res) {
        return res.render('admin/index', {
            title: 'Trang Chủ Quản Trị'
        })
    }
    
}

module.exports = new AdminController();