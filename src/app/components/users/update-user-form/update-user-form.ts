import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl('USER', [Validators.required]),
      enabled: new FormControl(true)
    })
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
