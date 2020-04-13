import { Component, OnInit, Input } from '@angular/core';
// import { ActivatedRoute, Router, ParamMap} from '@angular/router';
// import { AuthService } from "../auth.service";

@Component({
  selector: 'app-profile-nav-card',
  templateUrl: './profile-nav-card.component.html',
  styleUrls: ['./profile-nav-card.component.css']
})
export class ProfileNavCardComponent implements OnInit {

  @Input() inputProject
  @Input() inputProject1


  constructor(
  ) { }

  ngOnInit() {
  }

}
