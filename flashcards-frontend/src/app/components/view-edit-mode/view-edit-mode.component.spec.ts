import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewEditModeComponent } from './view-edit-mode.component';


describe('ViewEditModeComponent', () => {
  let component: ViewEditModeComponent;
  let fixture: ComponentFixture<ViewEditModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
