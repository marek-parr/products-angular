import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[];
  newName: String;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories
      }
      );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.categoryService.addCategory({ name } as Category)
      .subscribe(category => {
        this.getCategories();
        this.newName = '';
      });

  }

  delete(category: Category): void {
    this.categories = this.categories.filter(c => c !== category);
    this.categoryService.deleteCategory(category).subscribe();

  }

}
