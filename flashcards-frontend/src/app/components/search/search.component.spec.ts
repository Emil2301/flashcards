import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Translation } from 'src/app/models/translation.model';
import { SearchService } from 'src/app/services/search.service';
import { DOMHelper } from 'src/testing/dom-helper';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
	let fixture: ComponentFixture<SearchComponent>;
  let dh: DOMHelper<SearchComponent>;
  let searchServiceMock: any;

  beforeEach(async(() => {
    searchServiceMock = jasmine.createSpyObj('SearchService', [
      'searchFlashcard',
    ]);
    searchServiceMock.searchFlashcard.and.returnValue(
      of({
        title: 'testTitle',
        translations: [
          {
            type: 'translation',
            opendict: false,
            source: "<strong class='headword'>coño</strong>",
            target:
              "dupa <span class='genus'><acronym title='feminine'>f</acronym></span>",
            saved: false,
          },
        ],
      })
    );
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: SearchService, useValue: searchServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
		component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
  });

  describe('Simple HTML', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show no mat-selection-list before search', () => {
      expect(dh.count('mat-selection-list')).toBe(0);
    });

    it('should show mat-selection-list after having a translation', () => {
      component.translations = helper.getTranslations(1);
      fixture.detectChanges();
      expect(dh.count('mat-selection-list')).toBe(1);
    });

    it('should show 2 mat-options after having a 2 translation objects', () => {
      component.translations = helper.getTranslations(2);
      fixture.detectChanges();
      expect(dh.countNumberOfChildrenOfFirstTag('mat-selection-list')).toBe(2);
    });
	});
	
	describe('Functions', () => {
		it('should replace polish signs with english and return the string', () => {
			expect(component.cleanUpSpecialChars('żółć')).toBe('zolc');
    });
	})

	// describe('Async Calls', () => {
	// 	let helper: Helper;
  //   beforeEach(() => {
	// 		helper = new Helper();
	// 		fixture.detectChanges();
  //   });
	// })
});

class Helper {
  translations: Translation[] = [];
  getTranslations(amount: number) {
    for (let i = 0; i < amount; i++) {
      this.translations.push({
        type: 'translation',
        opendict: false,
        source: "<strong class='headword'>coño</strong>",
        target:
          "dupa <span class='genus'><acronym title='feminine'>f</acronym></span>",
        saved: false,
      });
    }
    return this.translations;
  }
}
