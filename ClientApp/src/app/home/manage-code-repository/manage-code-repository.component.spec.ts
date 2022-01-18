import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCodeRepositoryComponent } from './manage-code-repository.component';

describe('ManageCodeRepositoryComponent', () => {
  let component: ManageCodeRepositoryComponent;
  let fixture: ComponentFixture<ManageCodeRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCodeRepositoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCodeRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
