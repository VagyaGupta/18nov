import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDetailsComponent } from './vendor-details.component';

describe('VendorDetailsComponent', () => {
  let component: VendorDetailsComponent;
  let fixture: ComponentFixture<VendorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorDetailsComponent]
    });
    fixture = TestBed.createComponent(VendorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
