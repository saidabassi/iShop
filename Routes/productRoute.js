import express from "express"
const productRouter = express.Router()
import { getProducts, addProduct } from '../controllers/productController.js'
import { upload } from "../middleware/uploadMiddleware.js"


productRouter.post('/addProduct',upload.single('imageUrl'),addProduct)

productRouter.route('/allProducts').get(getProducts)
 
// productRouter.route('/:id').get(getProductById)
 

// productRouter.route('/:id').delete(deleteProduct)

export default productRouter     