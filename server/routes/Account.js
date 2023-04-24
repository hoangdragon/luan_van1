const express = require('express')
const router = express.Router()
const { Account } = require('../models')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, async (req, res) => {
    try {
        const account = await Account.findOne({
            where: { username: req.username },
            // attributes: { exclude: ['passowrd'] }
        })
        if (!account) return res.status(400).json({ success: false, message: 'khong tim thay ten dang nhap nay' })
    
        res.json({ success: true, account })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const account = await Account.findOne({
            where: { username }
        })
        if (account) { return res.status(400).json({ success: false, message: 'ten dang nhap da ton tai' }) }
        else {
            const hashPassword = await bcrypt.hash(password, 10)
            const newAccount = Account.create({
                username,
                password: hashPassword
            })
            const accessToken = sign({ username: newAccount.username, id: newAccount.id_account }, 'importantsecret')
            return res.status(201).json({ success: true, message: 'dang ky thanh cong', accessToken })
        }
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'loi dang ky tai khoan' })
    }
})
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username or password' })
    }
    try {
        const account = await Account.findOne({
            where: { username }
        })
        if (!account) return res.status(400).json({ success: false, message: 'ten dang nhap khong ton tai' })
        //found accoun

        bcrypt.compare(password, account.password).then((match) => {
            if (!match) return res.status(400).json({ success: false, message: 'sai ten dang nhap hoac mat khau' })
            
            //all good
            const accessToken = sign({ username: account.username }, 'importantsecret')
            res.json({ success: true, message: 'dang nhap thanh cong', accessToken, account })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'loi dang nhap' })
    }
})
router.put('/login/status/:username', async (req, res) => {
    const username = req.params.username;
    console.log('tên: ', username)
   
    try {
      const account = await Account.findOne({
        where: {username}
      });
     
      if (!account) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản' });
      }
  
      account.statusAccount = 1;
      await account.save()
      res.json({ success: true, message: 'Cập nhật trạng thái thành công' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Lỗi server' });
    }
})
module.exports = router