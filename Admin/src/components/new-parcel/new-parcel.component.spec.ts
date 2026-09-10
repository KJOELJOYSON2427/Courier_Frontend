import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParcelComponent } from './new-parcel.component';

describe('NewParcelComponent', () => {
  let component: NewParcelComponent;
  let fixture: ComponentFixture<NewParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewParcelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
