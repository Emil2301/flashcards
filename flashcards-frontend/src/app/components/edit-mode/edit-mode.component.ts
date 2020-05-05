import { Component, OnInit } from '@angular/core';
import { DB } from 'src/app/models/db.model';
import { SearchService } from 'src/app/services/search.service';
import { Search } from 'src/app/models/search.model';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss'],
})
export class EditModeComponent implements OnInit {
  cards;
	editModeOn = false;
	editionStarted = false;
	translations;
	titleInEdit;

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
				this.translations.map(translation => {
					translation.saved = false;
				})
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
	
	onCheckboxChange(title, isChecked, source, target, translations) {
    if (isChecked) {
			translations.map(translation => {
				if (translation.target === target) {
					translation.saved = true;
				}
			})
			this.searchService.postFlashcard(title, source, target, translations).subscribe(
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
	}
}
