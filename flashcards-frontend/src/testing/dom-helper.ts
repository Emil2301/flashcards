import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class DOMHelper<T> {
  fixture: ComponentFixture<T>;
  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }
  singleText(tagName: string): string {
    const element = this.fixture.debugElement.query(By.css(tagName));
    if (element) {
      return element.nativeElement.textContent;
    }
  }
  count(tagName: string): number {
    const element = this.fixture.debugElement.queryAll(By.css(tagName));
    return element.length;
  }
  countNumberOfChildrenOfFirstTag(tagName: string): number {
    const elements = this.fixture.debugElement.queryAll(By.css(tagName));
    return elements[0].nativeElement.children.length;
	}
}
