import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  top3Projects: [];
  new3Projects: [];
  high3Projects: [];
  currentUserId: String;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLogged()){
      this.currentUserId = JSON.parse(localStorage.getItem("user")).id;
    }
    const link = "http://localhost:3000/home";
    const user = {
      currentUserId: this.currentUserId
    };
    this.authService.postUser(user, link).subscribe(data => {
      this.top3Projects = data.homeProjects.top3Projects;
      this.new3Projects = data.homeProjects.new3Projects;
      this.high3Projects = data.homeProjects.high3Projects;
    });
  }

}
