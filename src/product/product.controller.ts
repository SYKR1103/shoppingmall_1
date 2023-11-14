import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  async createProduct(@Body() CreateProductDto:CreateProductDto) {
    return this.productService.createProduct()
  }
  
  @Get("all")
  async getProducts() {return this.productService.createProduct()}
  
  @Get(":id") 
  async getProductById(@Param("id") id:string) {return this.productService.getProductById()}
  
  @Get(":id")
  async updateProductById(@Param("id") id:string) {return this.productService.updateProductById()}
  
  @Get(":id")
  async deleteProductById(@Param("id") id:string) {return this.productService.deleteProductById()}

}
