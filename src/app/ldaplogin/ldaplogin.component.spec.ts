import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LDAPLoginComponent } from './ldaplogin.component';

describe('LDAPLoginComponent', () => {
  let component: LDAPLoginComponent;
  let fixture: ComponentFixture<LDAPLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LDAPLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LDAPLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
