import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DB } from 'src/app/models/db.model';
import { Search } from 'src/app/models/search.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-view-edit-mode',
  templateUrl: './view-edit-mode.component.html',
  styleUrls: ['./view-edit-mode.component.scss'],
})
export class ViewEditModeComponent implements OnInit {
  cards: Observable<SomeModel>; // this should be observable // there is no type for the following fields
  editModeOn = false;
  editionStarted = false;
  translations;
  titleInEdit;
  autoRenew = new FormControl();  // should be in constructor ?

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.getFlashcard();
  }

  ngOnDestory() {
    subscriber.unsubscribe() // wtedy tego nie musisz robic
  }

  getFlashcard() {
    this.searchService.getFlashcard().subscribe(  // subscribe dirrectly to observable and with async | pipe show results
      (data: DB) => {
        this.cards = data.cards;
      },
      (error) => {}
    );
  }
  deleteFlashcard(title) {
    this.searchService.deleteFlashcard(title).subscribe(
      (data: DB) => {
        this.getFlashcard();
      },
      (error) => {
      }
    );
  }

  editFlashcard(title) {
    this.titleInEdit = title;
    this.editionStarted = true;
    this.searchService.searchFlashcard(title).subscribe( // would be bettter to save previous result in order to not make to much calls to server
      (data: Search) => {
        this.translations = data.translations;
        this.translations.map((translation) => {
          translation.saved = false;
        });
      },
      (error) => {
      }
    );
  }

  toggleEditMode() {
    if (this.editModeOn) {
      this.editModeOn = false;
      this.endSaveMode();
    } else {
      this.editModeOn = true;
    }
  }

  onCheckboxChange(event, cardTitle) {
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
          cardTitle,
          selected.source,
          selected.target,
          translations
        )
        .subscribe(
          (data: Search) => {
          },
          (error) => {
          }
        );
    }
  }

  endSaveMode() {
    this.editionStarted = false;
    this.translations = '';
    this.getFlashcard();
    this.titleInEdit = null;
  }
}
