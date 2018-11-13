import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule, 
    MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivityDropdownComponent } from './activity-dropdown/activity-dropdown.component';
import { ActivityService } from './services/activity.service';
import { AttributesComponent } from './attributes/attributes.component';

@NgModule({
  declarations: [
    ActivityDropdownComponent,
    AttributesComponent,
    AppComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [ActivityService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [AttributesComponent]
})
export class AppModule { }
