import { SearchService } from 'src/app/services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.scss'],
})
export class SwitchLangComponent implements OnInit {
  selected = 'depl';

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  changeLanguage(event) {
		console.log(event.value);
		this.searchService.changeLanguage(event.value).subscribe(
      (data) => {
				console.log(data);
      },
      (error) => {
				console.log(error);
      }
    );
		
  }
}
