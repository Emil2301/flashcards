import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private searchService: SearchService) {}

  sendInputValue(inputValue) {
    this.searchService.searchFlashcard().subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
