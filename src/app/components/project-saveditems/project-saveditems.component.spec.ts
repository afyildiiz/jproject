import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSaveditemsComponent } from './project-saveditems.component';

describe('ProjectSaveditemsComponent', () => {
  let component: ProjectSaveditemsComponent;
  let fixture: ComponentFixture<ProjectSaveditemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSaveditemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSaveditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
