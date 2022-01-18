import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeRepositoryComponent } from './code-repository.component';

describe('CodeRepositoryComponent', () => {
  let component: CodeRepositoryComponent;
  let fixture: ComponentFixture<CodeRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeRepositoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
