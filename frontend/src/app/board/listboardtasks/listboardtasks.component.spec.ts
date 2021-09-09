import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListboardtasksComponent } from './listboardtasks.component';

describe('ListboardtasksComponent', () => {
  let component: ListboardtasksComponent;
  let fixture: ComponentFixture<ListboardtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListboardtasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListboardtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
