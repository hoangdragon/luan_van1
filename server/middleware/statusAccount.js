const { Account } = require('../models')

const verifyAdmin =async (req, res, next) => {
    const username = req.username;
//    console.log('user: ', username) 

    const account = await Account.findOne({
        where: {username}
    })
   
    //user.role
    if(account.role_id===1){
        next()
    }
    

}
module.exports = verifyAdmin