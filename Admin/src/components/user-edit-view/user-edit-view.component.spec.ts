import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditViewComponent } from './user-edit-view.component';

describe('UserEditViewComponent', () => {
  let component: UserEditViewComponent;
  let fixture: ComponentFixture<UserEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
