import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DifferComponent } from './differ.component';

describe('DifferComponent', () => {
  let component: DifferComponent;
  let fixture: ComponentFixture<DifferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DifferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
