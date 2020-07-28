module.exports = (req, res, next) => {
    //判断用户访问的是不是登录页面
    //判断用户的登录状态
    //如果用户是登录的，请求放行
    //如果用户不是登录的，将重定向到登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        // 如果用户是登录状态，而且是个普通用户
        if (req.session.role == 'normal') {
            return res.redirect('/home/')
        }
        //用户是登录状态，请求放行
        next();
    }
}