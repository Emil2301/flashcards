import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchService } from 'src/app/services/search.service';
import { DOMHelper } from 'src/testing/dom-helper';
import { SwitchLangComponent } from './switch-lang.component';

describe('SwitchLangComponent', () => {
  let component: SwitchLangComponent;
  let fixture: ComponentFixture<SwitchLangComponent>;
  let dh: DOMHelper<SwitchLangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchLangComponent],
      imports: [MatFormFieldModule, MatSelectModule, BrowserAnimationsModule],
      providers: [{ provide: SearchService, useClass: SearchServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchLangComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  describe('Simple HTML', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should contain an div tag', () => {
      expect(dh.singleText('h1')).toBe('Change languages in dictionary');
    });

    it('should show only one mat-select', () => {
      expect(dh.count('mat-select')).toBe(1);
    });
  });
});

class SearchServiceStub {}
