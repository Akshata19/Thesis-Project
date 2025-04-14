import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.username = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  @Output() helpClicked = new EventEmitter<void>();
  @Output() helpClicked1 = new EventEmitter<void>();
  @Output() helpClicked3 = new EventEmitter<void>();
  @Output() helpClicked4 = new EventEmitter<void>();
  @Output() helpClicked5 = new EventEmitter<void>();
  openHelp(): void {
    this.helpClicked.emit();
  }

  openHelp1(): void {
    this.helpClicked1.emit();
  }

  openHelp3(): void {
    this.helpClicked3.emit();
  }

  openHelp4(): void {
    this.helpClicked4.emit();
  }
  openHelp5(): void {
    this.helpClicked5.emit();
  }
}
