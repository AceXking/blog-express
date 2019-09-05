var express = require('express');
var router = express.Router();
const { 
    getList, 
    getDetail, 
    newBlog,
    updateBlog,
    delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
router.get('/list', (req, res, next) => {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    const result = getList(author, keyword)
    return result.then((listData) => {
        res.json(
            new SuccessModel(listData)
        ) 
    })
});
router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.body.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新失败')
            )
        }
    })
})
router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username
    const result = delBlog(req.body.id, author)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel('删除成功')
            )
        } else {
            res.json(
                new ErrorModel('删除失败')
            )
        }
    })
})
module.exports = router;
