import { Component } from '@angular/core';
import { Search } from 'src/app/models/search.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {	
	constructor(private searchService: SearchService) {}
	
	title;
	translations;

  sendInputValue(inputValue) {
    this.searchService.searchFlashcard(inputValue.trim()).subscribe((data: Search) => {
			this.title = data.title;
			this.translations = data.translations;
			console.log(data);			
    }, error => {
			this.title = error;
			this.translations = ''
		});
  }
}
