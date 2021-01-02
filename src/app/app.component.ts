import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public subscriptions = new Subscription();

  constructor(private fb: FormBuilder) {}

  get hobbies() {
    return this.form.get("hobbies") as FormArray;
  }

  ngOnInit() {
    this.createForm();

    this.subscriptions.add(
      this.form.statusChanges.subscribe(status => {
        console.log(status);
      })
    );

    this.subscriptions.add(
      this.form.valueChanges.subscribe(value => {
        console.log(value);
      })
    );
  }

  createForm() {
    this.form = this.fb.group({
      nom: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      hobbies: this.fb.array([]),
      password: [""]
    });
  }

  addHobby() {
    this.hobbies.push(this.fb.control(""));
  }

  deleteHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  submit() {
    console.log(this.form.value);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
