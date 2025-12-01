import { Component, inject, signal } from '@angular/core';
import { FormUtils } from '../../../utils/FormUtils';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const USER = {
  email: 'usuario@ups.edu.ec',
  password: '123456'
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  formUtils = FormUtils;

  // Señal para el mensaje de error
  errorMessage = signal<string | null>(null);

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.errorMessage.set(null);

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.myForm.value;

    if (email === USER.email && password === USER.password) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage.set('Correo o contraseña incorrectos.');
    }
  }
}
