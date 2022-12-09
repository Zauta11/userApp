import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  userForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(private fb: FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any, 
     private dialogRef: MatDialogRef<DialogComponent>) {}
     

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username:  ["", Validators.required],
      lastname:  ["", Validators.required],
      id:  ["", [Validators.required, Validators.pattern("^\s*-?[0-9]{11,11}\s*$")]],
      email: ["", [Validators.required, Validators.email]],
      date:  ["", Validators.required]
    })

    if (this.editData) {
      this.actionBtn = "Update"
      this.userForm.controls['username'].setValue(this.editData.username)
      this.userForm.controls['lastname'].setValue(this.editData.lastname)
      this.userForm.controls['id'].setValue(this.editData.id)
      this.userForm.controls['email'].setValue(this.editData.email)
      this.userForm.controls['date'].setValue(this.editData.date)
     }

  }


  addUser() {
    if(!this.editData) {
      this.api.postUser(this.userForm.value).subscribe({
        next: ()=> {
          alert("User Added Succesfully"),
          this.userForm.reset(),
          this.dialogRef.close("save")
        },
        error: ()=> {
          alert("error Succesfully")
        } 
    })} else {
      this.updateUser()
    }
  }


  updateUser() {
    this.api.editUser(this.userForm.value, this.editData.id).subscribe({
      next: () => {
        alert("Updated Succesfully"),
        this.userForm.reset(),
          this.dialogRef.close("update")
      },
      error: () => {
        alert("Error")
      }
    })
  }

  
}
