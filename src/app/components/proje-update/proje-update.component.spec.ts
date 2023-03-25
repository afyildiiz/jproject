import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjeUpdateComponent } from './proje-update.component';

describe('ProjeUpdateComponent', () => {
  let component: ProjeUpdateComponent;
  let fixture: ComponentFixture<ProjeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
