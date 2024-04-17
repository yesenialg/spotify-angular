import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthPageComponent],
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule, 
        ReactiveFormsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should return invalid', () => {
    //Arrange
    const mockCredentials = {
      email: 'aaa',
      password: '111'
    }

    const emailForm: any = component.formLogin.get('email');
    const passwordForm: any = component.formLogin.get('pasword');

    //Act
    emailForm?.setValue(mockCredentials.email);
    passwordForm?.setValue(mockCredentials.password);

    //Assert
    expect(component.formLogin.invalid).toEqual(true);
  });

  it('should return valid', () => {
    //Arrange
    const mockCredentials = {
      email: 'example@example.com',
      password: '123asdfg'
    }

    const emailForm: any = component.formLogin.get('email');
    const passwordForm: any = component.formLogin.get('pasword');

    //Act
    emailForm?.setValue(mockCredentials.email);
    passwordForm?.setValue(mockCredentials.password);

    //Assert
    expect(component.formLogin.invalid).toEqual(false);
  });

  it('button should say "Iniciar sesión"', () => {
    //Arrange
    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const innerText = elementRef.nativeElement.innerText;

    //Act
    
    //Assert
    expect(innerText).toEqual('Iniciar sesión')
  });
});
