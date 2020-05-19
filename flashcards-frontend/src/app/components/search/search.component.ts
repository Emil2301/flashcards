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
  translations; // it should be translations object from search.model.ts
  error;
  mojObserver: Transla

    sendInputValue(inputValue) { // getTranslations/serachForTranslations
		inputValue = this.cleanUpSpecialChars(inputValue.trim());
    this.searchService.searchFlashcard(inputValue).pipe().subscribe(mojObserver)
      // .subscribe(
      // (data: Search) => {  // use rxjs for that and subscribe to observable or subject
      //   this.title = data.title; // I think it is not neede create simply proper object structure in search.model.ts
      //   this.translations = data.translations;
      //   this.translations.map((translation) => {
      //     translation.saved = false; // you could create class with default value to false or just handle undefined as false
      // });
      //   this.error = '';
      // },
      // (error) => {
      //   this.error = error;
      //   this.translations = '';
      // }
    );
  }

  cleanUpSpecialChars(str) { // this should be in utils/helpers
    str.toLowerCase();
    return str
      .replace('ą', 'a') // there is some regex which convert all speical characters from foreing language to english cahcarcters
      .replace('ć', 'c')
      .replace('ę', 'e')
      .replace('ń', 'n')
      .replace('ó', 'o')
      .replace('ł', 'l')
      .replace('ź', 'z')
      .replace('ż', 'z');
  }

  onCheckboxChange(event, mojWybor) {
    if (event.option._selected) {
      let translations = event.option.value[1]; // const
      let selected = event.option.value[0];
      translations.map((translation) => {
        if (translation.target === event.option.value[0].target) {
          translation.saved = true; // what if api calls fails it should be consisten with api and handled in subscribe()
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
          (data: Search) => {
            // handle it here translation.saved = true; /
          },
          (error) => {}
        );
    }
  }
}
