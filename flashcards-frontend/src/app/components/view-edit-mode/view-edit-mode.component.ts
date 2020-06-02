import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DB } from 'src/app/models/db.model';
import { Search } from 'src/app/models/search.model';
import { SearchService } from 'src/app/services/search.service';
import { Translation } from 'src/app/models/translation.model';

@Component({
  selector: 'app-view-edit-mode',
  templateUrl: './view-edit-mode.component.html',
  styleUrls: ['./view-edit-mode.component.scss'],
})
export class ViewEditModeComponent implements OnInit {
  cards;
  editModeOn = false;
  editionStarted = false;
  translations: Translation[];
  titleInEdit;
  autoRenew = new FormControl();

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.getFlashcards();
  }

  getFlashcards() {
    this.searchService.getFlashcards().subscribe(
      (data: DB) => {
        this.cards = data.cards;
      },
      (error) => {}
    );
  }
  deleteFlashcard(title) {
    this.searchService.deleteFlashcard(title).subscribe(
      (data: DB) => {
        this.getFlashcards();
      },
      (error) => {
      }
    );
  }

  editFlashcard(title) {
    this.titleInEdit = title;
    this.editionStarted = true;
    this.searchService.searchFlashcard(title).subscribe(
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
    this.translations = [];
    this.getFlashcards();
    this.titleInEdit = null;
  }
}
