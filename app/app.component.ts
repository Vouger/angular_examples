import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { AttributesComponent } from './attributes/attributes.component';
import { ActivityService } from "./services/activity.service";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  show = {
      button : false,
      count : false,
      loading : false,
      type : true
  };

  components = [];

  stateForm: FormGroup = this.fb.group({
    activity_name: null,
    activity_id: null,
    activity_type: null,
    activity_count: 1,
    activity_date: null,
    attributes: this.fb.group({})
  });

  constructor(
    private fb: FormBuilder, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private activityService: ActivityService,
    private datePipe: DatePipe,
    public snackBar: MatSnackBar
  ) { }

  selectActivity({item, type}) {
    this.resetAttributes();
    this.show.button = true;
    this.show.type = false;

    if (type == 'sport') {
        this.show.count = true;
    } else {
        this.show.count = false;
    }

    this.stateForm.patchValue({activity_id: item.id});
    this.stateForm.patchValue({activity_type: type});

    if (item.attributes_full_list) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AttributesComponent);
        const component = this.container.createComponent(componentFactory);
    
        const control = < FormGroup > this.stateForm.controls['attributes'];
        item.attributes_full_list.forEach(eachObj => {
            control.addControl(eachObj.id, new FormControl(''));
        });
    
        component.instance.attributes_list = item.attributes_full_list;
        component.instance.formControl = control;
    
        this.components.push(component);
    }
  }

  resetAttributes() {
    this.container.clear();

    this.stateForm.patchValue({activity_id: null});
    this.stateForm.patchValue({activity_type: null});
    this.stateForm.patchValue({activity_date: null});
    this.stateForm.removeControl('attributes');
    this.stateForm.addControl('attributes', this.fb.group({}));
  }

  resetForm() {
    this.resetAttributes();
    this.stateForm.reset();
    this.stateForm.patchValue({activity_count: 1});
    this.show.button = false;
    this.show.type = true;
  }

  onTypeChange($event) {
    this.show.button = true;
  }

  addActivity() {
    let activity_date = this.stateForm.value['activity_date'];
    this.stateForm.value['activity_date'] = this.datePipe.transform(activity_date, 'yyyy-MM-dd');
    this.show.loading = true;

    this.activityService.addActivity(this.stateForm.value).subscribe(
       data => {    
         this.show.loading = false;
         this.resetForm();
         this.snackBar.open("Activity added", "Ok", {
           duration: 2000,
         });
         return true;
       },
       error => {
         this.show.loading = false;
         console.log(error);
         return true;
       }
    );
  }
}
