import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchFlashcard() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
