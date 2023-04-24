const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const multer = require('multer');
const { AccountProfile } = require('../models')
const { Account } = require('../models')
const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/accountProfile/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.originalname)
      const fileName = file.fieldname + '-' + uniqueSuffix + ext
      cb(null, fileName)
    }
  })
});
router.get('/all', verifyToken, async (req, res) => {
  try {
    const profile = await AccountProfile.findAll({
      include: [{ model: Account, attributes: ['role', 'statusAccount'] }]
    })
    if (profile) {
      console.log('mảng account: ', profile[0].Account.role)
      res.json({ success: true, profile })
    } else {
      res.json({ success: true, profile: [] })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Loi server' })
  }
})
router.get('/', verifyToken, async (req, res) => {
  try {
    const profile = await AccountProfile.findOne({
      where: { username: req.username }
    })
    if (profile) {
      res.json({ success: true, profile })
    } else {
      res.json({ success: true, profile: [] })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Loi server' })
  }
})
router.get('/username', verifyToken, async (req, res) => {
  try {
    const profile = await AccountProfile.findOne({
      where: { username: req.username }

    })
    console.log('usename', req.body)
    if (profile) {
      res.json({ success: true, profile })
    } else {
      res.json({ success: true, profile: [] })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Loi server' })
  }
})

router.post('/', verifyToken, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'student', maxCount: 1 }

]), async (req, res) => {
  const { username, fullname, age, phone, address } = req.body
  try {

    const profile = AccountProfile.create({
      username: username,
      fullname: fullname,
      age: age,
      phone: phone,
      address: address,
      avatar: req.files['avatar'][0].filename,
      student: req.files['student'][0].filename
    })
    return res.status(201).json({ success: true, message: 'Chỉnh sửa thông tin cá nhân thành công' })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật thông tin cá nhân' })
  }
})

router.put('/:id', verifyToken, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'student', maxCount: 1 }
]), async (req, res) => {
  const id = req.params.id
  const { fullname, age, phone, address } = req.body
  try {
    let UpdateProfile = await AccountProfile.findByPk(id)
    if (!UpdateProfile) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tai khoan' });

    }
    UpdateProfile.fullname = fullname
    UpdateProfile.age = age
    UpdateProfile.phone = phone
    UpdateProfile.address = address
    if (req.files['avatar']) {
      UpdateProfile.avatar = req.files['avatar'][0].filename
    }
    if (req.files['student']) {
      UpdateProfile.student = req.files['student'][0].filename
    }

    await UpdateProfile.save()


    res.json({ success: true, message: 'Cập nhật thành công' })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Lỗi server' })
  }
})


module.exports = router