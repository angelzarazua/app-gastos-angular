import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditItemListComponent } from './modal-edit-item-list.component';

describe('ModalEditItemListComponent', () => {
  let component: ModalEditItemListComponent;
  let fixture: ComponentFixture<ModalEditItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
