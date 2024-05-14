import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interfaces/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule
  ],
  providers: [ChatService],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {

  message: any = ''
  messages: Message[] = []
  sessionId: string = ''; 
  assistentId = 40;
  response: any;
  complimentCount = 0;
  complaintCount = 0;

  constructor(private chatService: ChatService) { }

  
  async ngOnInit() {
    this.createSession()
  }

  createSession() {
    this.chatService.createSession().subscribe((response: any) => {
      console.log("Sessão criada!")
      this.response = response
      this.sessionId = response.id;
      this.assistentId = response.assistent_id
    })
  }


  sendMessage() {
    this.messages.push({
      user: 'user',
      text: this.message
    });
    this.chatService.sendMessage(this.message, this.sessionId).subscribe({
      next: (response: any) => {
        const botMessage = response;
        const content = botMessage.response[0];

        if(content.type === "trigger") {
          if(content.data.function_name == 'recebe_elogio') {
            this.complimentCount++;
            this.messages.push({
              user: 'bot',
              text: 'Obrigado pelo elogio!'
            });
          } else if(content.data.function_name == 'recebe_reclamacao') {
            this.complaintCount++;
            this.messages.push({
              user: 'bot',
              text: 'Obrigado pela crítica construtiva!'
            });
          }
        } else {
          this.messages.push({
            user: 'bot',
            text: botMessage.response[0].data
          });
        }

        this.message = '';
      },
      error: (error) => {
        console.error('Erro ao enviar mensagem:', error);
      }
    });
  }
}
