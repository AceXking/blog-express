var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    // const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            // 设置 session
            req.session.username = data.username
            req.session.realname = data.realname
            res.json(
                new SuccessModel()
            )
            return 
        }
        res.json(
            new ErrorModel('登陆失败')
        )
    })
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel('登录失败')
});

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            code: 0,
            msg: '已登录'
        })
        return
    }
    res.json({
        code: -1,
        msg: '未登录'
    })
})
module.exports = router;
