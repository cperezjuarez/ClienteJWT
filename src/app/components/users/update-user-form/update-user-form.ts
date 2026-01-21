import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user-form.html',
  styleUrl: './update-user-form.css',
})
export class UpdateUserForm {
  dialogRef = inject(MatDialogRef<UpdateUserForm>);
  form!: FormGroup;

  ngOnInit(): void {
    const optionalMinLength = (min: number): ValidatorFn => {
      return (control: AbstractControl) => {
        const v = control.value;
        if (v === null || v === undefined || v === '') return null;
        return Validators.minLength(min)(control);
      };
    };

    this.form = new FormGroup({
      username: new FormControl(null, [optionalMinLength(3), Validators.maxLength(50)]),
      password: new FormControl(null, [optionalMinLength(6)]),
      email: new FormControl(null, [Validators.email]),
      role: new FormControl('USER', [Validators.required]),
      enabled: new FormControl(true)
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
