import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrl: './auth-page.component.css',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf]
})
export class AuthPageComponent implements OnInit {

  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(private _authService: AuthService,
            private _router: Router) { }
  
  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('test@test.com', 
          [
            Validators.required,
            Validators.email
          ]
        ),
        password: new FormControl('12345678',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ]
        )
      }
    )
  }

  sendLogin(): void {
    const { email, password} = this.formLogin.value
    this._authService.sendCredentials(email, password)
    .subscribe({
      next: () => {
        console.log('Sesion iniciada')
        this._router.navigate(['/', 'tracks']);
      },
      error: (e) => {
        console.log('Error iniciando sesion', e.error), 
        this.errorSession = true
      }
    })
  }
}
