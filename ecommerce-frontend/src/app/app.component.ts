import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ChattbotComponent } from './chattbot/chattbot.component';
import { Chatbot2Component } from './chatbot2/chatbot2.component';
import { AuthService } from './services/auth.service';
import { Chatbot3Component } from './chatbot3/chatbot3.component';
import { Chatbot4Component } from './chatbot4/chatbot4.component';
import { Chatbot5Component } from './chatbot5/chatbot5.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    ChattbotComponent,
    Chatbot2Component,
    Chatbot3Component,
    Chatbot4Component,
    Chatbot5Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  username: string = '';
  title = 'ecommerce-frontend';
  isCollapsed = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: string | null) => {
      if (user) {
        this.username = user;
      }
    });
  }
  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown: any) {
    dropdown.close();
  }
  chatVisible: boolean = false;
  chatVisible1: boolean = false;
  chatVisible3: boolean = false;
  chatVisible4: boolean = false;
  chatVisible5: boolean = false;
  openChat(): void {
    this.chatVisible = true; // Opens the chatbot
  }

  openChat1(): void {
    this.chatVisible1 = true; // Opens the chatbot
  }

  openChat3(): void {
    this.chatVisible3 = true; // Opens the chatbot
  }

  openChat4(): void {
    this.chatVisible4 = true; // Opens the chatbot
  }

  openChat5(): void {
    this.chatVisible5 = true; // Opens the chatbot
  }

  closeChat(): void {
    this.chatVisible = false; // Closes the chatbot
  }

  closeChat1(): void {
    this.chatVisible1 = false; // Closes the chatbot
  }

  closeChat3(): void {
    this.chatVisible3 = false;
  }

  closeChat4(): void {
    this.chatVisible4 = false;
  }

  closeChat5(): void {
    this.chatVisible5 = false;
  }
}
