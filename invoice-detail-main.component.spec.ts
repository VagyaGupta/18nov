import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailMainComponent } from './invoice-detail-main.component';

describe('InvoiceDetailMainComponent', () => {
  let component: InvoiceDetailMainComponent;
  let fixture: ComponentFixture<InvoiceDetailMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceDetailMainComponent]
    });
    fixture = TestBed.createComponent(InvoiceDetailMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
