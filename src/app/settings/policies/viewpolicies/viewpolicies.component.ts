import { Component, OnInit } from '@angular/core';
import { SlapolicyService } from '../slapolicy.service';

@Component({
  selector: 'app-viewpolicies',
  templateUrl: './viewpolicies.component.html',
  styleUrls: ['./viewpolicies.component.css']
})
export class ViewpoliciesComponent implements OnInit {

  roles: any = {};
  id: any;
  agents: any = {};
  slapolicies: any = {};

  url = 'https://localhost:44333';
  public loading = false;

  public loadingmodal = false;

  constructor(private slaservice: SlapolicyService) { }

  ngOnInit() {
    this.slaservice.get().subscribe(data => {
      this.slapolicies = data;
   });
  }

}
