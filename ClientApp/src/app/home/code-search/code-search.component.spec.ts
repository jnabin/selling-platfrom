import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSearchComponent } from './code-search.component';

describe('CodeSearchComponent', () => {
  let component: CodeSearchComponent;
  let fixture: ComponentFixture<CodeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
