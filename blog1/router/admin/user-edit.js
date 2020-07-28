const { User } = require('../../model/user');


module.exports = async(req, res) => {

    //标识 当前访问的是用户编辑页面
    req.app.locals.currentLink = "user";

    //获取当前地址栏中的参数
    const { message, id } = req.query;

    //如果传递了id参数
    if (id) {
        //修改操作
        let user = await User.findOne({ _id: id });

        //渲染用户页面修改
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-modify?id=' + id,
            button: '修改',
            user: user
        })
    } else {
        //添加操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        })
    }


}