import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { DB } from 'src/app/models/db.model';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss'],
})
export class EditModeComponent implements OnInit {
	db;
	titles;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.getFlashcard();
  }

  getFlashcard() {
    this.searchService.getFlashcard().subscribe(
      (data: DB) => {
				this.db = data;				
      },
      (error) => {}
    );
  }
}
