//创建用户集合

//引入mongoose第三方模块
const mongoose = require('mongoose');
//引入bcrypt模块
const bcrypt = require('bcrypt');
//引入joi模块
const Joi = require('joi');

//创建用户集合规则
//mongoose.Schema()是一个构造函数，我们要创建一个构造函数的实例，所以使用new操作符去创建它的一个实例
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    // 0 启用 1 禁用
    state: {
        type: Number,
        default: 0
    }
});

//创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    let salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash('123456', salt);
    User.create({
        username: 'lisi',
        email: 'lisi@163.com',
        password: pass,
        role: 'admin',
        state: 0
    });
}

const validateUser = user => {
    //定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    return Joi.validate(user, schema)
}

//createUser()

module.exports = {
    User,
    validateUser
}