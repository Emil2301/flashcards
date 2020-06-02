import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Translation } from 'src/app/models/translation.model';
import { SearchService } from 'src/app/services/search.service';
import { ViewEditModeComponent } from './view-edit-mode.component';

describe('ViewEditModeComponent', () => {
  let component: ViewEditModeComponent;
  let fixture: ComponentFixture<ViewEditModeComponent>;
  let searchServiceMock: any;
  let helper: Helper;

  beforeEach(async(() => {
    helper = new Helper();
    searchServiceMock = jasmine.createSpyObj('SearchService', [
      'getFlashcards',
    ]);
    searchServiceMock.getFlashcards.and.returnValue(
      of({
        cards: helper.getTranslations(2),
      })
    );
    TestBed.configureTestingModule({
      declarations: [ViewEditModeComponent],
      imports: [MatSlideToggleModule],
      providers: [{ provide: SearchService, useValue: searchServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditModeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();		
    helper = new Helper();
  });

  describe('Simple HTML', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Async Calls', () => {
    beforeEach(() => {});

    it('should call getFlashcards on the ngOnInit', () => {
      component.ngOnInit();
      expect(searchServiceMock.getFlashcards).toHaveBeenCalledTimes(1);
    });

    it('should contain at least one flashcards after ngOnInit', () => {
      component.ngOnInit();
      fixture.detectChanges();
      const elements = fixture.debugElement.queryAll(By.css('.grid-item'));
      expect(elements.length).toBe(2);
    });

    it('should turn on the editmode after clicking on switch', () => {
      const matSlideToggle = fixture.debugElement.query(By.css('.container'))
        .nativeNode.children[0];
      // expect(matSlideToggleText.innerText).toBe('Turn ON Edit Mode');
      // component.toggleEditMode();
      // fixture.detectChanges();
      // expect(matSlideToggle.innerText).toBe('Turn OFF Edit Mode');
      debugger;
    });

    // it('should call deleteFlashcard func after clicking on Delete button', () => {

    // });
  });
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
