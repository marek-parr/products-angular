import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = '/api/categories';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCategory(id: number): Observable<Category> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.get<Category>(url);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, category, this.httpOptions);
  }

  updateCategory(category: Category): Observable<Category> {
    const id = category.id;
    const url = `${this.categoryUrl}/${id}`;
    
    return this.http.put<Category>(url, category, this.httpOptions);
  }

  deleteCategory(category: Category): Observable<Category> {
    const id = typeof category === 'number' ? category : category.id;
    const url = `${this.categoryUrl}/${id}`;

    return this.http.delete<Category>(url, this.httpOptions);
  }

}
