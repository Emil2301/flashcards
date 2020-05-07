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
  cards;
  editModeOn = false;
  editionStarted = false;
  translations;
  titleInEdit;
  autoRenew = new FormControl();

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.getFlashcard();
  }

  getFlashcard() {
    this.searchService.getFlashcard().subscribe(
      (data: DB) => {
        this.cards = data.cards;
        console.log(data.cards);
      },
      (error) => {}
    );
  }
  deleteFlashcard(title) {
    console.log(title);
    this.searchService.deleteFlashcard(title).subscribe(
      (data: DB) => {
        this.getFlashcard();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editFlashcard(title) {
    this.titleInEdit = title;
    console.log('edit ' + title);
    this.editionStarted = true;
    this.searchService.searchFlashcard(title).subscribe(
      (data: Search) => {
        console.log(data);
        this.translations = data.translations;
        this.translations.map((translation) => {
          translation.saved = false;
        });
        console.log(this.translations);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleEditMode() {
    this.editModeOn = !this.editModeOn;
  }

  // onCheckboxChange(title, isChecked, source, target, translations) {
  //   if (isChecked) {
  //     translations.map((translation) => {
  //       if (translation.target === target) {
  //         translation.saved = true;
  //       }
  //     });
  //     this.searchService
  //       .postFlashcard(title, source, target, translations)
  //       .subscribe(
  //         (data: Search) => {
  //           console.log(data);
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   }
	// }
	
	onCheckboxChange(event, cardTitle) {
		console.log('dupa1');
    if (event.option._selected) {
			let translations = event.option.value[1];
			let selected = event.option.value[0];
			translations.map((translation) => {
        if (translation.target === event.option.value[0].target) {
          translation.saved = true;
        }
			});
		console.log('dupa2');

			this.searchService
        .postFlashcard(cardTitle, selected.source, selected.target, translations)
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

  endSaveMode() {
    this.toggleEditMode();
    this.editionStarted = false;
    this.translations = '';
    this.getFlashcard();
    this.autoRenew.setValue(false);
  }
}
