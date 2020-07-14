import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.css']
})
export class RegisteradminComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(private userService: UserService , private adminService: AdminService , private router: Router) { }

  ngOnInit() {
    this.userService.logOut();

  }

  register() {
    this.adminService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
      console.log("register clicked");
    }, err => {
      this.errorMessage = 'Username is already exist.';
    });
  }

}
