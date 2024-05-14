import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public apiUrl = environment.apiUrl;
  public apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({ 
      'api-key': this.apiKey,
      'Content-Type': 'application/json'
    });
  }

  createSession() {
    const headers = this.getHeaders();
    const requestBody = { assistant_id: 40 };
    return (this.http.post(`/session`, requestBody, { headers })) 
  }

  sendMessage(message: string, sessionId: string) {
    const headers = this.getHeaders();
    return this.http.put(`/session/${sessionId}`, { message }, { headers });
  }
}
