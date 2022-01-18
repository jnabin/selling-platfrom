import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTempUserComponent } from './create-temp-user.component';

describe('CreateTempUserComponent', () => {
  let component: CreateTempUserComponent;
  let fixture: ComponentFixture<CreateTempUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTempUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTempUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
