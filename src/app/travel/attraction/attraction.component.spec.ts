import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionComponent } from './attraction.component';

describe('AttractionComponent', () => {
  let component: AttractionComponent;
  let fixture: ComponentFixture<AttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
