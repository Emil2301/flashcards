import { LayoutModule } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DOMHelper } from 'src/testing/dom-helper';
import { MainNavComponent } from './main-nav.component';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;
  let dh: DOMHelper<MainNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainNavComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  describe('Simple HTML', () => {
    it('should compile', () => {
      expect(component).toBeTruthy();
    });

    it('should be a minimum one a tag', () => {
      expect(dh.count('a')).toBeGreaterThanOrEqual(1);
    });

    it('the first link (a tag) should have a text Search inside', () => {
      expect(dh.singleText('a')).toBe('Search');
    });
  });

  describe('Navigation', () => {
		let location: Location;
		let router: Router;
		beforeEach(() => {
			location = TestBed.get(Location);
			router = TestBed.get(Router);
		})
    it('Should navigate to / before button click', () => {
      expect(location.path()).toBe('');
    });

    it('Should navigate to /view-edit-mode on View & Edit button click', () => {
      spyOn(router, 'navigateByUrl');
      const aEleArray = fixture.debugElement.queryAll(By.css('a'));
      const aViewEditEle = aEleArray[2].nativeNode;
      aViewEditEle.click();
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(['/view-edit-mode']),
        { skipLocationChange: false, replaceUrl: false, state: undefined }
      );
    });
  });
});
