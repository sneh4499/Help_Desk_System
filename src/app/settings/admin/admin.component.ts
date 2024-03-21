import { RoleService } from './../roles/role.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  roleguid: any;

  public pageaccess = false;
  public settings = false;
  public loading = false;
  public helpdesk = false;
  public agents = false;
  public groups = false;
  public tags = false;
  public types = false;
  public viewroles = false;


  constructor(private cookie: CookieService, private router: Router, private roleservice: RoleService) { }

  ngOnInit() {

    this.loading = true;

    if (this.cookie.get('Guid') === '') {
      this.router.navigate(['login']);
    }

    if (this.cookie.get('RoleGuid') === '') {
      this.router.navigate(['login']);
    }

    this.roleguid = this.cookie.get('RoleGuid');

    this.roleservice.getbyid(this.roleguid).subscribe(data => {
      this.loading = false;

      if (data['rolename'] === 'Administrator') {
        this.helpdesk = false;
        this.viewroles = false;
        this.pageaccess = false;
        this.settings = true;
      } else {
        this.helpdesk = true;
        this.viewroles = true;
        this.pageaccess = false;
        this.settings = true;
      }


      if (data['adminview'] === 'false') {
        this.pageaccess = true;
        this.settings = false;
      } else {
        this.pageaccess = false;
        this.settings = true;
      }

      if (data['manageagent'] === 'false') {
        this.agents = true;
      } else {
        this.agents = false;
      }

      if (data['managegroups'] === 'false') {
        this.groups = true;
      } else {
        this.groups = false;
      }

      if (data['managetags'] === 'false') {
        this.tags = true;
      } else {
        this.tags = false;
      }

      if (data['managetypes'] === 'false') {
        this.types = true;
      } else {
        this.types = false;
      }


   });
  }

}
