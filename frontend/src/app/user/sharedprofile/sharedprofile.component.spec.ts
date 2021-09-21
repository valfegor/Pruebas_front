import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedprofileComponent } from './sharedprofile.component';

describe('SharedprofileComponent', () => {
  let component: SharedprofileComponent;
  let fixture: ComponentFixture<SharedprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
