const express = require('express')
const router = express.Router()
const multer = require('multer');

const { PostSoft } = require('../models')
const path = require('path');
//const { verify } = require('crypto');
const verifyToken = require('../middleware/auth');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/postsoft/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.originalname)
      const fileName = file.fieldname + '-' + uniqueSuffix + ext
      cb(null, fileName)
    }
  })
});

router.get('/all', async (req, res) => {
  try {
    const postsoft = await PostSoft.findAll()
    res.json({ success: true, postsoft })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Lỗi server' })
  }
})

router.get('/', verifyToken, async (req, res) => {
  try {
    const postsoft = await PostSoft.findAll({
      where: { username: req.username }
    })
    
    res.json({ success: true, postsoft })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Lỗi server' })
  }

})
//post 1 soft
router.post('/', verifyToken, upload.fields([
  {name: 'image1', maxCount: 1},
  {name: 'file_zip', maxCount: 1},
])
,async (req, res) => {
    const { username, name, price, description } = req.body;
    try {
      const newPost = await PostSoft.create({
        username: username,
        name: name,
        price: price,
        description: description,
        image: req.files['image1'][0].filename,
        file_zip: req.files['file_zip'][0].filename
        
      });
      res.status(201).json({ success: true, message: 'thanh cong', postsoft: newPost })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }

  })

// Update a post
router.put('/:id', verifyToken, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'file_zip', maxCount: 1 }
]), async (req, res) => {
  const id = req.params.id;
  console.log('id bài đăng cần tìm: ', id)
  const { name, price, description } = req.body;

  try {
    let updatedPost = await PostSoft.findByPk(id);

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài đăng' });
    }

    updatedPost.name = name;
    updatedPost.price = price;
    updatedPost.description = description;

    if (req.files['image']) {
      // console.log('ảnh trước cập nhật: ', post.image)
      updatedPost.image = req.files['image'][0].filename;
      // console.log('ảnh sau cập nhật',post.image)
    }

    if (req.files['file_zip']) {
      updatedPost.file_zip = req.files['file_zip'][0].filename;
    }
    console.log('bài đăng truóc khi cập nhật: ', updatedPost)
    await updatedPost.save();
    console.log('bài đăng sau khi cập nhật: ', updatedPost)

    res.json({ success: true, message: 'Cập nhật thành công', post: updatedPost })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Lỗi server' })
  }
});


router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { id_postsoft: req.params.id, username: req.username }
    const deletedPost = await PostSoft.destroy({
      where: postDeleteCondition
    })

    // User not authorised or post not found
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: 'Post not found or user not authorised'
      })

    res.json({ success: true, post: deletedPost })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router