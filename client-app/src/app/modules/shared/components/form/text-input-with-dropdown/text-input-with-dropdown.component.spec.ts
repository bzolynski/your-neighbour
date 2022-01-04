import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputWithDropdownComponent } from './text-input-with-dropdown.component';

describe('TextInputWithDropdownComponent', () => {
  let component: TextInputWithDropdownComponent;
  let fixture: ComponentFixture<TextInputWithDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInputWithDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputWithDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
