import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.scss'],
})
export class SwitchLangComponent {
  selected: String = 'depl';

  constructor(private searchService: SearchService) {}

  changeLanguage(event) {
    this.selected = event.value;
    this.searchService.changeLanguage(event.value).subscribe(
      (data) => {},
      (error) => {}
    );
  }
}
