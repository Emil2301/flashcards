import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchFlashcard(inputValue) {
    return this.http.post<Search>('http://localhost:3000/test',  { title: inputValue || 'test' });
  }
}
