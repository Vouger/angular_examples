import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { catchError, map, tap,startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';
import { ActivityService } from "../services/activity.service";
import { Activity } from "../models/activity";

@Component({
  selector: 'app-activity-dropdown',
  templateUrl: './activity-dropdown.component.html',
  styleUrls: ['./activity-dropdown.component.css']
})
export class ActivityDropdownComponent implements OnInit {
  @Input() stateForm: FormGroup;
  @Output() selectActivity = new EventEmitter<any>();

  activitySelect(item, type) {
    this.selectActivity.emit({item, type});
  }

  activitiesOptions: Observable<Activity[]>;

  constructor(private service: ActivityService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.activitiesOptions = this.stateForm.get('activity_name')!.valueChanges
      .pipe(
          startWith(null),
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(val => {
            return this.filterGroup(val || '')
          })   
      );
  }

  filterGroup(val: string): Observable<any[]> {
    return this.service.getActivities(val)
    .pipe(
      map(response => response.filter(option => { 
        return option
      }))
    )
  }

  ngOnChanges() {
    this.ref.detectChanges()
  }
}
