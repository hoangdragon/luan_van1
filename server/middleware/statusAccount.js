const statusAccount = (req, res, next) => {
    const status = req.account.statusAccount
    if(status===1){
        next()
    }
    return res.status(403).json({success: false, message: 'Tai khoan chua duoc duyet'})

}
module.exports = statusAccount