import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DiffGetterService } from '../diff-getter.service';
import { environment } from '../../environments/environment';




@Component({
  selector: 'app-differ',
  templateUrl: './differ.component.html',
  styleUrls: ['./differ.component.scss']
})
export class DifferComponent implements OnInit {

  diffForm: FormGroup;
  formSubscription: Subscription;
  diffId: string;
  left = '';
  right = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private diffGetter: DiffGetterService,
    ) { }

  ngOnInit() {
    console.log(environment);
    // Initialize our form controls.

    this.diffForm = this.formBuilder.group({
      left:  ['', Validators.required],
      right:  ['', Validators.required],
    });

    // Make sure our form result subscription is in place.
    this.formSubscription = this.diffForm.valueChanges.pipe(debounceTime(200))
      .subscribe(formResult => {
        console.log(formResult);
        this.left = formResult.left;
        this.right = formResult.right;
      });

    // If we have a diff ID, go get it.
    if (this.route.snapshot.paramMap.get('id')) {
      console.log('Got here');
      this.diffId = this.route.snapshot.paramMap.get('id');
      console.log('Attempting to get info for ', this.diffId);
      this.diffGetter.getId(this.diffId)
        .subscribe( result => {
          console.log('result is ', result);
          const jsonVal = JSON.parse(result);
          this.diffForm.controls.left.setValue(jsonVal['left']);
          this.diffForm.controls.right.setValue(jsonVal['right']);
        });
    }

  }

  setDiff() {
    console.log('Setting the diffs!');
    console.log(this.diffForm);
    this.diffGetter.setId(this.diffForm)
      .subscribe( diffId => {
        console.log(diffId);
        window.history.replaceState({}, '', `/diffs/${diffId}`);
      });
  }

}
