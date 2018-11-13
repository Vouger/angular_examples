import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {
  @Input() attributes_list; 
  @Input() formControl: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
