
class AdminController {
    index(req, res) {
        return res.render('admin/index', {
            title: 'Trang Chủ Quản Trị'
        })
    }
}

module.exports = new AdminController();