const jwtHelper = require("../helper/jwtHelper");
const utterModel = require("../models/utterModel");
const dataUtterModel = require("../models/dataUtterModel");
const slug = require("slug")
class UtterController {
    // [GET] /Utter
    async index(req, res) {
        try {
            const tokenFromClient = req.cookies?.token || "";
            const decode = await jwtHelper.verifyToken(tokenFromClient);
            const role = decode?.data?.role;
            const fullname = decode?.data?.first_name + " " + decode?.data?.last_name;
            const avatar = decode?.data?.avatar;
            let utters = await utterModel.find({}).populate([{ path: 'user_id', select: 'first_name last_name' }]);
            // console.log(utters);
            return res.render('admin/utter/index', {
                title: 'Danh Sách Câu Hỏi',
                utters: utters,
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
    // [GET] /utter/create
    async create(req, res) {
        try {
            const tokenFromClient = req.cookies?.token || "";
            const decode = await jwtHelper.verifyToken(tokenFromClient);
            const role = decode?.data?.role;
            const fullname = decode?.data?.first_name + " " + decode?.data?.last_name;
            const avatar = decode?.data?.avatar;
            return res.render("admin/utter/create", {
                title: 'Thêm Mới Câu Hỏi',
                Login: {
                    role,
                    fullname,
                    avatar
                }
            })
        } catch (error) {
            return res.redirect('/admin');
        }
    }
    // [POST] /utter/create
    async store(req, res) {
        try {
            const tokenFromClient = req.cookies?.token || "";
            const decode = await jwtHelper.verifyToken(tokenFromClient);
            const idUser = decode?.data?._id;
            let body = req.body;
            if (!idUser) {
                return res.redirect('/admin/login');
            }
            let utter = {
                name: body.name,
                slug: slug(body.name),
                description: body.description,
                user_id: idUser
            }
            // console.log(utter);
            new utterModel(utter).save().then(async (rs) => {
                let dataUtter = body.dataUtter || null;
                if (dataUtter) {
                    dataUtter = [...dataUtter.split("\n")].map(item => item.trim()).filter(value => value);
                    dataUtter = [...dataUtter].map(item => {
                        return {
                            'content': item,
                            'utter_id': rs._id,
                            'user_id': idUser
                        }
                    })
                    // console.log(dataUtter);
                    await dataUtterModel.insertMany(dataUtter);
                }
                return res.redirect('/admin/utter');
            }).catch((err) => {
                console.log(err);
                return res.redirect('/admin');
            });
        } catch (error) {
            console.log(`err2`);
            console.log({ 'err2': error });
            return res.redirect('/admin');
        }
    }
    // [GET] /Utter/edit/:id
    async edit(req, res) {
        try {

            const tokenFromClient = req.cookies?.token || "";
            const decode = await jwtHelper.verifyToken(tokenFromClient);
            const role = decode?.data?.role;
            const fullname = decode?.data?.first_name + " " + decode?.data?.last_name;
            const avatar = decode?.data?.avatar;

            const { id } = req.params
            // console.log(id);
            const prUtter = utterModel.findById(id);
            const prdataUtter = dataUtterModel.find({ Utter_id: id })

            Promise.all([prUtter, prdataUtter]).then((value) => {
                // console.log('dataUtter :',value[1]);
                const dataUtter = [...value[1]].map(item => item.content).join('\n');
                return res.render("admin/utter/edit", {
                    title: 'Sửa Thông Tin Câu Hỏi',
                    Login: {
                        role,
                        fullname,
                        avatar
                    },
                    Utter: value[0],
                    dataUtter: dataUtter,
                })
            })
        } catch (error) {
            console.log(error);
            return res.redirect('/admin');
        }
    }
    // [POST] /utter/edit/:id
    async update(req, res) {
        try {
            const tokenFromClient = req.cookies?.token || "";
            const decode = await jwtHelper.verifyToken(tokenFromClient);
            const idUser = decode?.data?._id;
            let body = req.body;
            const { id } = req.params;
            if (!id) {
                return res.redirect('/admin/utter');
            }
            let updateUtter = {
                name: body.name,
                slug: slug(body?.name),
                description: body.description,
            }
            // console.log(Utter);
            utterModel.findOneAndUpdate({ _id: id }, { $set: updateUtter })
                .then(async (rs) => {
                    let dataUtter = body.dataUtter || null;
                    if (dataUtter) {
                        dataUtter = [...dataUtter.split("\n")].map(item => item.trim()).filter(value => value);
                        dataUtter = [...dataUtter].map(item => {
                            return {
                                'content': item,
                                'utter_id': rs._id,
                                'user_id': idUser
                            }
                        })
                        // console.log(dataUtter);
                        let prDeleteDataUtter = dataUtterModel.deleteMany({ utter_id: id })
                        let prInsertDataUtter = dataUtterModel.insertMany(dataUtter);

                        Promise.all([prDeleteDataUtter, prInsertDataUtter])
                    }
                    return res.redirect('/admin/utter');
                }).catch((err) => {
                    console.log(err);
                    return res.redirect('/admin');
                });
        } catch (error) {
            console.log(`err2`);
            console.log({ 'err2': error });
            return res.redirect('/admin');
        }
    }
    // [GET] /user/delete/:id
    async delete(req, res) {
        try {
            const { id } = req.params;
            let prDeleteDataUtter = dataUtterModel.deleteMany({ Utter_id: id })
            let prDeleteUtter = UtterModel.findOneAndDelete({ _id: id })

            Promise.all([prDeleteDataUtter, prDeleteUtter])
            res.redirect("/admin/utter");

        } catch (error) {
            console.log(error);
            return res.redirect('/admin');
        }
    }
}

module.exports = new UtterController();