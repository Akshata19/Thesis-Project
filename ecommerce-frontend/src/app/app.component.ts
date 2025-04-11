import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ChattbotComponent } from './chattbot/chattbot.component';
import { Chatbot2Component } from './chatbot2/chatbot2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ChattbotComponent, Chatbot2Component],
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
chatVisible1:boolean=false;
  openChat(): void {
    this.chatVisible = true; // Opens the chatbot
  }

  openChat1(): void {
    this.chatVisible1 = true; // Opens the chatbot
  }

  closeChat(): void {
    this.chatVisible = false; // Closes the chatbot
  }

  closeChat1(): void {
    this.chatVisible1 = false; // Closes the chatbot
  }
}
