const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const login = (username, password) => {
    username = escape(username)
    password = genPassword(password)
    password = escape(password)
    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
    //先使用假数据
    // if(username === 'zhangsan' && password === '123'){
    //     return true
    // }
    // return false
}
module.exports = {
    login
}