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
    this.searchService.searchFlashcard(inputValue.trim()).subscribe(
      (data: Search) => {
        this.title = data.title;
				this.translations = data.translations;
				this.translations.map(translation => {
					translation.saved = false;
				})
        console.log(this.translations);
      },
      (error) => {
        this.title = error;
        this.translations = '';
      }
    );
  }

  onCheckboxChange(isChecked, source, target, translations) {
    if (isChecked) {
			translations.map(translation => {
				if (translation.target === target) {
					translation.saved = true;
				}
			})
			this.searchService.postFlashcard(this.title, source, target, translations).subscribe(
				(data: Search) => {					
					console.log(data);
				},
				(error) => {
					console.log(error);
				}
			);
    }
  }
}
