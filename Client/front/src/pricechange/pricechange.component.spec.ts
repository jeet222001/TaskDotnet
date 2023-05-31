import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricechangeComponent } from './pricechange.component';

describe('PricechangeComponent', () => {
  let component: PricechangeComponent;
  let fixture: ComponentFixture<PricechangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricechangeComponent]
    });
    fixture = TestBed.createComponent(PricechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
