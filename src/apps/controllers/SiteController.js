
class SiteController {
    // [GET] /
    index = (req, res) => {
        return res.render('site/index', { title: 'Trang Chủ' })
    }
    // [GET] /contact
    contact = (req, res) => {
        return res.render('site/contact', { title: 'Liên Hệ' })
    }
    // [POST] /contact
    sendMessage = async (req, res) => {
        return res.render('site/contact', { title: 'POST Liên Hệ' })
    }
    // [GET] /about
    about = (req, res) => {
        return res.render('site/about', { title: 'Chúng Tôi' })
    }
    // [GET] /donate
    donate = (req, res) => {
        return res.render('site/donate', { title: 'Donate' })
    }
    // [GET] /service
    service = (req, res) => {
        return res.render('site/service', { title: 'Dịch Vụ' })
    }
}

module.exports = new SiteController();