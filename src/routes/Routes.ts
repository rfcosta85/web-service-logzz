import express from 'express'
import productRoutes from '../routes/ProductRoutes'

const router = express.Router()

router.use('/product',productRoutes)

export default router