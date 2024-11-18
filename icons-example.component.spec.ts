import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsExampleComponent } from './icons-example.component';

describe('IconsExampleComponent', () => {
  let component: IconsExampleComponent;
  let fixture: ComponentFixture<IconsExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconsExampleComponent]
    });
    fixture = TestBed.createComponent(IconsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
