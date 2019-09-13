import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = '/api/products';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product, this.httpOptions);
  }

  updateProduct(product: Product): Observable<Product> {
    const id = product.id;
    const url = `${this.productUrl}/${id}`;

    return this.http.put<Product>(url, product, this.httpOptions);
  }

  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions);
  }
}
