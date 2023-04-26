const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const verifyAdmin = require('../middleware/statusAccount')
const { Category } = require('../models')


router.get('/', verifyToken, async (req, res) => {

    try {
        const arrayCategory = await Category.findAll()
        // console.log('mảng danh mục: ', arrayCategory)
        if (arrayCategory) {
            res.json({ success: true, arrayCategory })
            return
        } else {
            res.json({ success: true, arrayCategory: [] })
            return
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Lỗi server' })
    }
})
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
    const categoryName = req.body.categoryName
    console.log('name cate: ', req.body.categoryName)
    try {
        const arrayCategory = await Category.create({
            categoryName: categoryName
        })
        console.log('mảng: ', arrayCategory)
        return res.status(201).json({ success: true, message: 'them danh muc thanh cong', arrayCategory })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Lỗi them danh muc' })
    }
})
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const category_id = req.params.id
        const categoryDelete = await Category.destroy({
            where: { category_id }
        })
        if (!categoryDelete) {
            return res.status(401).json({
                success: false,
                message: 'khong tim thay danh muc can xoa'
            })
        }
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id
    console.log('id1234: ', id)

    const { categoryName } = req.body
    console.log('name: ', categoryName)
    try {
        let updateCate = await Category.findByPk(id)

        if (!updateCate) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy danh muc' });

        }
        updateCate.categoryName = categoryName
        await updateCate.save()

        res.json({ success: true, message: 'Cập nhật thành công', updateCate })
        console.log('danh muc sau update: ', updateCate)
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Lỗi server' })
    }
})

module.exports = router