import { Component } from '@angular/core';
import { Search } from 'src/app/models/search.model';
import { SearchService } from 'src/app/services/search.service';
import { Translation } from 'src/app/models/translation.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private searchService: SearchService) {}

  title: String;
  translations: Translation[];
  error;

  sendInputValue(inputValue) {
		inputValue = this.cleanUpSpecialChars(inputValue.trim());
    this.searchService.searchFlashcard(inputValue).subscribe(
      (data: Search) => {
        this.title = data.title;
        this.translations = data.translations;
        this.translations.map((translation) => {
          translation.saved = false;
        });
        this.error = '';
      },
      (error) => {
        this.error = error;
        this.translations = [];
      }
    );
  }

  cleanUpSpecialChars(str) {
    str.toLowerCase();
    return str
      .replace('ą', 'a')
      .replace('ć', 'c')
      .replace('ę', 'e')
      .replace('ń', 'n')
      .replace('ó', 'o')
      .replace('ł', 'l')
      .replace('ź', 'z')
      .replace('ż', 'z');
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
        .postFlashcard(
          this.title,
          selected.source,
          selected.target,
          translations
        )
        .subscribe(
          (data: Search) => {},
          (error) => {}
        );
    }
  }
}
