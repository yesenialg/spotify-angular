import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarComponent } from './side-bar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideBarComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
