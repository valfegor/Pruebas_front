import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeassignmentComponent } from './revokeassignment.component';

describe('RevokeassignmentComponent', () => {
  let component: RevokeassignmentComponent;
  let fixture: ComponentFixture<RevokeassignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevokeassignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevokeassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
