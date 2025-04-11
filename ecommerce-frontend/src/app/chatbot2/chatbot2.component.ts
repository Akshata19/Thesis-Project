import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot2.component.html',
  styleUrl: './chatbot2.component.scss'
})
export class Chatbot2Component {
  @Output() close = new EventEmitter<void>();
  userMessage = '';
  isTyping = false;
  isChatOpen = true;

  messages: {
    text?: string;
    sender: string;
    image?: string;
    isButtonGroup?: boolean;
    buttons?: { title: string; payload: string }[];
  }[] = [];

  ngOnInit(): void {
    // Simulate user "greet" intent to start the conversation with Chatbot2
    this.sendMessage('Hello from second bot');
  }

  sendMessage(message: string): void {
    if (message.trim() === '') return;

    this.messages.push({ sender: 'You', text: message });
    this.userMessage = '';
    this.isTyping = true;

    fetch('http://localhost:5005/webhooks/rest/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: 'user', message: message })
    })
      .then((response) => response.json())
      .then((data) => {
        this.isTyping = false;

        if (data.length === 0) {
          this.messages.push({ sender: 'Bot', text: "Sorry, I didn't get that." });
          return;
        }

        data.forEach((res: any) => {
          if (res.text && res.text.trim() !== '') {
            this.messages.push({ sender: 'Bot', text: res.text });
          }

          if (res.buttons && res.buttons.length > 0) {
            this.messages.push({
              sender: 'Bot',
              isButtonGroup: true,
              buttons: res.buttons
            });
          }

          if (res.image) {
            this.messages.push({ sender: 'Bot', image: res.image });
          }
        });
      })
      .catch((error) => {
        this.isTyping = false;
        console.error('Error:', error);
        this.messages.push({ sender: 'Bot', text: 'Something went wrong. Please try again later.' });
      });
  }

  handleButtonClick(payload: string, title: string): void {
    this.messages.push({ sender: 'You', text: title });
    this.isTyping = true;

    fetch('http://localhost:5055/webhooks/rest/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: 'user', message: payload })
    })
      .then((response) => response.json())
      .then((data) => {
        this.isTyping = false;

        if (data.length === 0) {
          this.messages.push({ sender: 'Bot', text: "Sorry, I didn't get that." });
          return;
        }

        data.forEach((res: any) => {
          if (res.text && res.text.trim() !== '') {
            this.messages.push({ sender: 'Bot', text: res.text });
          }

          if (res.buttons && res.buttons.length > 0) {
            this.messages.push({
              sender: 'Bot',
              isButtonGroup: true,
              buttons: res.buttons
            });
          }

          if (res.image) {
            this.messages.push({ sender: 'Bot', image: res.image });
          }
        });
      })
      .catch((error) => {
        this.isTyping = false;
        console.error('Error:', error);
        this.messages.push({ sender: 'Bot', text: 'Something went wrong. Please try again later.' });
      });
  }

  closeChat(): void {
    this.close.emit();
  }
}
