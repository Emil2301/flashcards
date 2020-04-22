import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchFlashcard() {
    return this.http.get('http://localhost:3000/test', {headers: {
			'Access-Control-Allow-Origin': '*'
		}});
  }
}
