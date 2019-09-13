import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service'
import { Product } from '../product'
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  selectedCategory: Category;
  categories: Category[];
  productToAdd: Product;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.productToAdd = new Product();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  add(product: Product): void {
    this.productToAdd.category = this.selectedCategory;
    this.productToAdd.name = this.productToAdd.name.trim();
    if (!this.productToAdd.name || this.productToAdd.category == undefined) { return; }
    this.productService.addProduct(this.productToAdd)
      .subscribe(product => {
        this.products.push(product);
        this.getProducts();
      });
  }

  delete(product: Product): void {
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product).subscribe();
  }

}
