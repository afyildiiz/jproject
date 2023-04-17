import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemdataComponent } from './itemdata.component';

describe('ItemdataComponent', () => {
  let component: ItemdataComponent;
  let fixture: ComponentFixture<ItemdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
