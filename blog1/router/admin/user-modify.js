const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    //接受客户端传过来的请求参数
    const { username, email, password, role, state } = req.body;
    //即将要修改的用户id
    const id = req.query.id;

    //找出指定id的用户，修改前进行密码比对
    let user = await User.findOne({ _id: id });

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        res.redirect('/admin/user')
    } else {
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行用户的修改', id: id };
        next(JSON.stringify(obj));
    }
}