import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}
  // loginForm = this.fb.group({
  //   email: ['', Validators.required, Validators.email],
  //   password: ['', Validators.required],
  // });
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in Successfully',
          loading: 'Logging in....',
          error: ({ message }) => `There was an error: ${message} `,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}

// in angular 14  update we are getting forms  UntypedFormGroup,  UntypedFormControl, with this we can assign in string type to number for example on ngOnInit(){ this.loginform.setvalue({email:100}) } --> this will accept email here comes forms in risk to overcome this we are using "nonNullabel flag" &"NonNullableFormBuilder" intially wedont want to put values as null insted of that we need empty string for that we are using nonNullabel flag
