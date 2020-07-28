const { User, validateUser } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {


    try {
        //实施验证
        await validateUser(req.body);
    } catch (ex) {
        //验证没有通过
        //重定向回用户添加页面
        //return res.redirect(`/admin/user-edit?message=${ex.message}`)
        //next里参数只能传一个参数，只能是字符串。
        //JSON.stringify()将对象类型转换成字符串类型 
        next(JSON.stringify({ path: '/admin/user-edit', message: ex.message }));
    }

    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        //重定向回用户添加页面
        //return res.redirect(`/admin/user-edit?message=邮箱地址已被占用！`)
        next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已被占用！' }));
    }
    //对密码进行加密
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;

    //将用户信息添加到数据库中
    await User.create(req.body);
    //将页面重定向当用户列表页面
    res.redirect('/admin/user');
}