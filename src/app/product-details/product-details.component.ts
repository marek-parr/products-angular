import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Category } from '../category';
import { CategoryService } from '../category.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: Product;
  selectedCategory: Category;
  categories: Category[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getProduct();
    this.getCategories();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.product.category = this.selectedCategory;
    this.productService.updateProduct(this.product)
      .subscribe(() => {
        this.goBack();
      });
  }


}
