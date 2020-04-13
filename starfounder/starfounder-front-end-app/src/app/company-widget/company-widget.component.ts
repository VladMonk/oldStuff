import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-widget',
  templateUrl: './company-widget.component.html',
  styleUrls: ['./company-widget.component.css']
})
export class CompanyWidgetComponent implements OnInit {

  @Input() inputProject
  @Input() curUser

  constructor() { }

  ngOnInit() {
  }

}
