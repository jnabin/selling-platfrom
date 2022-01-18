import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTreeViewComponent } from './code-tree-view.component';

describe('CodeTreeViewComponent', () => {
  let component: CodeTreeViewComponent;
  let fixture: ComponentFixture<CodeTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeTreeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
