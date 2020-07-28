const { User } = require('../../model/user');
//引入bcrypt模块
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    //接受请求参数
    const { email, password } = req.body;
    //对用户没有输入邮件地址进行二次验证，因为可能存在浏览器禁止了加载js文件的操作
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' });
    };
    //根据邮箱地址查询用户信息,如果查询到了用户 user变量的值为对象类型，否则为空类型
    let user = await User.findOne({ email });
    let isValid = await bcrypt.compare(password, user.password);
    //查询到了用户
    if (user) {
        if (isValid) {
            //将用户名存储在请求对象中
            req.session.username = user.username;
            // 将用户角色存储在session中
            req.session.role = user.role;
            req.app.locals.userInfo = user;
            // 对用户的角色进行判断
            if (user.role == 'admin') {
                //重定向到用户列表页面
                res.redirect('/admin/user')
            } else {
                // 重定向到博客首页
                res.redirect('/home/')
            }

        } else {
            res.status(400).render('admin/error', { msg: '密码错误' })
        }
    } else {
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }
}