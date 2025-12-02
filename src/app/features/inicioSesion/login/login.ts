import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormUtils } from '../../../utils/FormUtils';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

const USER = {
  email: 'usuario@ups.edu.ec',
  password: '123456'
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  //styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  formUtils = FormUtils;

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
      this.router.navigate(['/home']); // puede ser q se cambie a /pokemon
    } else {
      this.errorMessage.set('Correo o contraseña incorrectos.');
    }
  }
}
