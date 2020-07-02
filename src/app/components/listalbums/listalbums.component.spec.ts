import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListalbumsComponent } from './listalbums.component';

describe('ListalbumsComponent', () => {
  let component: ListalbumsComponent;
  let fixture: ComponentFixture<ListalbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListalbumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListalbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
