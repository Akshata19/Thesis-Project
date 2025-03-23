import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  categoryId: string = '';
  categoryName: string = 'Selected Category';
  products: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Get the category ID from the route
    this.categoryId = this.route.snapshot.paramMap.get('categoryId') || '';
    console.log(this.categoryId);

    // Fetch products for the given category
    this.fetchProductsByCategory();
  }

  fetchProductsByCategory(): void {
    console.log(this.categoryId);
    this.http
      .get<any>(`http://localhost:3000/api/products/category/${this.categoryId}`)
      .subscribe(
        (response: { success: any; products: any[]; }) => {
          if (response.success) {
            this.products = response.products;
          } else {
            console.error('Failed to fetch products.');
          }
        },
        (error: { message: any; }) => {
          console.error('Error fetching products:', error.message);
        }
      );
  }
}
