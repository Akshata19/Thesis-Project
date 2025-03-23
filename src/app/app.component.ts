import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ChattbotComponent } from './chattbot/chattbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ChattbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-frontend';

    isCollapsed = true;
 collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown:any) {
    dropdown.close();
  }
  chatVisible: boolean = false; // Controls chatbot visibility

  openChat(): void {
    this.chatVisible = true; // Opens the chatbot
  }

  closeChat(): void {
    this.chatVisible = false; // Closes the chatbot
  }
}
