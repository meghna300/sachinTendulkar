import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SachinComponent } from './sachin.component';

describe('SachinComponent', () => {
  let component: SachinComponent;
  let fixture: ComponentFixture<SachinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SachinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SachinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
