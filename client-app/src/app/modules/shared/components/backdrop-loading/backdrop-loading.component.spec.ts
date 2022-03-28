import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdropLoadingComponent } from './backdrop-loading.component';

describe('BackdropLoadingComponent', () => {
  let component: BackdropLoadingComponent;
  let fixture: ComponentFixture<BackdropLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackdropLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackdropLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
