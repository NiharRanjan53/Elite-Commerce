import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListConntroller,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

// Create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update Product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get Products
router.get("/get-product", getProductController);

// Single Product
router.get("/get-product/:slug", getSingleProductController);

//Get Photo
router.get("/product-photo/:pid", productPhotoController);

// Delete Product
router.delete("/delete-product/:pid", deleteProductController); // not tested

// filter product
router.post("/product-filters", productFiltersController);

// Product Count
router.get("/product-count", productCountController);

//Product Per Page
router.get("/product-list/:page", productListConntroller);

// Search Product
router.get("/search/:keyword", searchProductController);

// Similar Products
router.get("/related-product/:pid/:cid", relatedProductController);

// Category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;
