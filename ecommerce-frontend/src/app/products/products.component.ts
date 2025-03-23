import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<any>('http://localhost:3000/api/products').subscribe(
      (response: { success: any; products: any[]; }) => {
        if (response.success) {
          this.products = response.products;
        } else {
          console.error('Failed to fetch products.');
        }
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
