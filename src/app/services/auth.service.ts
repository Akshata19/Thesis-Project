import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  
  private apiUrl = 'http://localhost:3000/api/auth';
  currentUser: any;

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  setUser(username: string): void {
    this.userSubject.next(username); // Emit username for all subscribers
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null); // Reset username globally
    this.router.navigate(['/login']);
  }
  verifyToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http
        .get(`${this.apiUrl}/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (response: any) => this.userSubject.next(response.user.username),
          () => this.userSubject.next(null)
        );
    }
  }
}
