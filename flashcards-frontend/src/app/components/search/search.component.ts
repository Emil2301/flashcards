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
	error;

  sendInputValue(inputValue) {
    this.searchService.searchFlashcard(inputValue.trim()).subscribe(
      (data: Search) => {
        this.title = data.title;
        this.translations = data.translations;
        this.translations.map((translation) => {
          translation.saved = false;
				});
				this.error = '';
        console.log(this.translations);
      },
      (error) => {
        this.error = error;
        this.translations = '';
      }
    );
  }

  onCheckboxChange(event) {
    if (event.option._selected) {
			let translations = event.option.value[1];
			let selected = event.option.value[0];
			translations.map((translation) => {
        if (translation.target === event.option.value[0].target) {
          translation.saved = true;
        }
			});
			this.searchService
        .postFlashcard(this.title, selected.source, selected.target, translations)
        .subscribe(
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
