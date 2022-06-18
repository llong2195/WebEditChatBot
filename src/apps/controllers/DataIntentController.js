const jwtHelper = require("../helper/jwtHelper");
const intentModel = require("../models/intentModel");
const dataIntentModel = require("../models/dataIntentModel");
class DataIntentController {
    // [GET] /dataintent
    async index(req, res) {
        try {
            const tokenFromClient = req.cookies?.token || "";
            const decode = await jwtHelper.verifyToken(tokenFromClient);
            const role = decode?.data?.role;
            const fullname = decode?.data?.first_name + " " + decode?.data?.last_name;
            const avatar = decode?.data?.avatar;
            let intents = await dataIntentModel.find({}).populate([{ path: 'user_id', select: 'first_name last_name' }, { path: 'intent_id', select: 'name slug' }]);
            // console.log(intents);
            return res.render('admin/dataintent/index', {
                title: 'Danh Sách Dữ Liệu Câu Hỏi',
                intents: intents,
                Login: {
                    role,
                    fullname,
                    avatar
                }
            })
        } catch (error) {
            console.log({ "err index :": error });
            return res.redirect('/admin');
        }
    }

    // [GET] /dataintent/edit/:id
    async edit(req, res) {
        try {

            const tokenFromClient = req.cookies?.token || "";
            const decode = await jwtHelper.verifyToken(tokenFromClient);
            const role = decode?.data?.role;
            const fullname = decode?.data?.first_name + " " + decode?.data?.last_name;
            const avatar = decode?.data?.avatar;

            const { id } = req.params
            // console.log(id);
            let intent = await dataIntentModel.findById(id);
            console.log(intent);
            return res.render('admin/dataintent/edit', {
                title: 'Dữ Liệu Câu Hỏi',
                intent: intent,
                Login: {
                    role,
                    fullname,
                    avatar
                }
            })

        } catch (error) {
            console.log(error);
            return res.redirect('/admin');
        }
    }
    // [POST] /dataintent/edit/:id
    async update(req, res) {
        try {

            const { id } = req.params
            const updateIntent = {
                content: req.body.content
            }
            console.log(id);
            console.log(updateIntent);
            let intent = await dataIntentModel.findOneAndUpdate({ id: id }, { $set: updateIntent });
            console.log(intent);
            return res.redirect('/admin/dataintent');

        } catch (error) {
            console.log(error);
            return res.redirect('/admin');
        }
    }
    // [GET] /user/delete/:id
    async delete(req, res) {
        try {
            const { id } = req.params;
            dataIntentModel.findByIdAndDelete(id).then(() => {
                res.redirect("/admin/dataintent");
            })

        } catch (error) {
            console.log(error);
            return res.redirect('/admin');
        }
    }
}

module.exports = new DataIntentController();