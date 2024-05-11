import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/product.js"
import ErrorHandler from "../utils/errorHandler.js";
import APIFilters from "../utils/apiFilters.js";
import Order from "../models/order.js";
//get products => /api/v1/products
export const getProducts = catchAsyncError( async (req,res) =>{
    const resPerPage = 4;
    const apiFilters = new APIFilters(Product,req.query).search().filters()

    let products = await apiFilters.query;
    let filteredProductsCount = products.length;
    
    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();
    
    res.status(200).json({
        resPerPage,
        filteredProductsCount,
        products
    });
});

//get products  - ADMIN => /api/v1/admin/products
export const getAdminProducts = catchAsyncError( async (req,res) =>{
    
    const products = await Product.find();
    
    res.status(200).json({
        products
    });
});

//create new product => /api/v1/admin/products
export const newProduct = catchAsyncError(async (req,res) =>{
    req.body.user = req.user._id;
    const product = await Product.create(req.body)

    res.status(200).json({
        product,
    });
});

//get single product details => /api/v1/products/:id
export const getProductDetails = catchAsyncError(async (req, res, next) =>{
    const product = await Product.findById(req?.params?.id).populate('reviews.user')
    if(!product){
        // return res.status(404).json({
        //     error:"product not found"
        // });
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        product,
    });
});

//update product details => /api/v1/admin/products/:id
export const updateProduct = catchAsyncError(async (req,res, next) =>{
    let product = await Product.findById(req?.params?.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    console.log(req.user);
    product = await Product.findByIdAndUpdate(req?.params?.id,req.body,{new:true});
    res.status(200).json({
        product,
    });
});

//delete product details => /api/v1/products/:id
export const deleteProduct = catchAsyncError(async (req,res, next) =>{
    let product = await Product.findById(req?.params?.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

   await product.deleteOne();
    res.status(200).json({
        message:"Product deleted"
    });
});

//create/update product review => /api/v1/reviews
export const createProductReview = catchAsyncError(async (req,res, next) =>{
    const {rating, comment, productId} = req.body;
    const review  = {
        user:req?.user?._id,
        rating:Number(rating),
        comment:comment
    }
    let product = await Product.findById(productId);
    
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    const isReviewed = product?.reviews?.find(
        (r) => r.user.toString() === req?.user?._id.toString()
    );

    if(isReviewed){
        product.reviews.forEach((review) =>{
            if(review.user.toString() === req?.user?._id.toString()){
                review.comment = comment,
                review.rating = rating
            }
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = 
        product.reviews.reduce((acc, item) => item.rating + acc,0)/
        product.reviews.length;

    await product.save({validateBeforeSave : false});
    res.status(200).json({
        success:true
    });

});

//get product reviews ==> api/v1/reviews
export const getProductReviews = catchAsyncError(async (req,res, next) =>{
    const product = await Product.findById(req.query.id);
    
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        reviews: product.reviews
    });

});

//delete review - admin ==> api/v1/admin/reviews
export const deleteReview = catchAsyncError(async (req,res, next) =>{
    
    const product = await Product.findById(req.query.productId);
    
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    const reviews = product?.reviews?.filter(
        (review) => {
            review._id.toString() !== req?.query?.id.toString()
        }
    );
    const numOfReviews = reviews.length;
    
    const ratings = 
        numOfReviews === 0 ? 0 :
        product.reviews.reduce((acc,item) => item.rating + acc,0) /
        numOfReviews;

    const updatedProduct = await 
        Product.findByIdAndUpdate(req.query.productId, {reviews, numOfReviews, ratings},{new:true});
    res.status(200).json({
        success : true,
        updatedProduct
    });

});

//can user review ==>/api/v1/can_review
export const canUserReview = catchAsyncError(async (req,res, next) =>{
    const orders = await Order.find({
        user:req.user._id,
        "orderItems.product":req.query.productId
    });

    if(orders.length === 0){
        return res.status(200).json({   canReview: false  });
    }
    
    res.status(200).json({
        canReview: true 
    });
})

