import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SlapolicyService } from '../slapolicy.service';
import { SlapolicyClass } from '../slapolicyclass';

@Component({
  selector: 'app-newpolicy',
  templateUrl: './newpolicy.component.html',
  styleUrls: ['./newpolicy.component.css']
})
export class NewpolicyComponent implements OnInit {

  public loading: boolean;

  days = [];
  hours = [];
  minutes = [];

  guid: any;
  policy: any = {};

  constructor(private slaservice: SlapolicyService, private router: Router, private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    for (let i = 0; i < 31; i++) {
      if (i > 9) {
        this.days.push(i);
      } else {
        this.days.push('0' + i);
      }

    }
    for (let i = 0; i < 24; i++) {
      if (i > 9) {
        this.hours.push(i);
      } else {
      this.hours.push('0' + i);
      }
    }
    for (let i = 0; i < 60; i++) {
      if (i > 9) {
        this.minutes.push(i);
      } else {
        this.minutes.push('0' + i);
      }
    }

    this.route.queryParams.subscribe(params => {
      this.guid = params['id'];
    });

    this.slaservice.getbyid(this.guid).subscribe(data => {
      this.policy = data;
      // tslint:disable-next-line: prefer-const
      let strurgent: string = this.policy.urgentresponsetime;
      // tslint:disable-next-line: prefer-const
      let responseday = strurgent.substring(0, 2);
      if (responseday.lastIndexOf(':') === 1) {
        this.policy.urgentresponseday = responseday.slice(0, -1);
      } else {
        this.policy.urgentresponseday = responseday;
      }
      this.policy.urgentresponsehours = strurgent.substring(3, 5);
      this.policy.urgentresponseminutes = strurgent.substring(6, 8);

      // tslint:disable-next-line: prefer-const
      let strurgent1: string = this.policy.urgentresolutiontime;
      this.policy.urgentresolutionday = strurgent1.substring(0, 2);
      this.policy.urgentresolutionhours = strurgent1.substring(3, 5);
      this.policy.urgentresolutionminutes = strurgent1.substring(6, 8);

      // tslint:disable-next-line: prefer-const
      let strhigh: string = this.policy.highresponsetime;
      this.policy.highresponseday = strhigh.substring(0, 2);
      this.policy.highresponsehours = strhigh.substring(3, 5);
      this.policy.highresponseminutes = strhigh.substring(6, 8);

      // tslint:disable-next-line: prefer-const
      let strhigh1: string = this.policy.highresolutiontime;
      this.policy.highresolutionday = strhigh1.substring(0, 2);
      this.policy.highresolutionhours = strhigh1.substring(3, 5);
      this.policy.highresolutionminutes = strhigh1.substring(6, 8);

      // tslint:disable-next-line: prefer-const
      let strmed: string = this.policy.mediumresponsetime;
      this.policy.mediumresponseday = strmed.substring(0, 2);
      this.policy.mediumresponsehours = strmed.substring(3, 5);
      this.policy.mediumresponseminutes = strmed.substring(6, 8);

      // tslint:disable-next-line: prefer-const
      let strmed1: string = this.policy.mediumresolutiontime;
      this.policy.mediumresolutionday = strmed1.substring(0, 2);
      this.policy.mediumresolutionhours = strmed1.substring(3, 5);
      this.policy.mediumresolutionminutes = strmed1.substring(6, 8);

       // tslint:disable-next-line: prefer-const
       let strlow: string = this.policy.lowresponsetime;
       this.policy.lowresponseday = strlow.substring(0, 2);
       this.policy.lowresponsehours = strlow.substring(3, 5);
       this.policy.lowresponseminutes = strlow.substring(6, 8);

       // tslint:disable-next-line: prefer-const
       let strlow1: string = this.policy.lowresolutiontime;
       this.policy.lowresolutionday = strlow1.substring(0, 2);
       this.policy.lowresolutionhours = strlow1.substring(3, 5);
       this.policy.lowresolutionminutes = strlow1.substring(6, 8);
   });
  }

  onTemplateFormSubmit() {

    this.loading = true;

    var opost = new SlapolicyClass();
    opost.SlaGuid = this.guid;
    opost.Policyname = this.policy.policyname;
    opost.Policydescription = this.policy.policydescription;
    // tslint:disable-next-line: max-line-length
    opost.Urgentresponsetime = this.policy.urgentresponseday + ':' + this.policy.urgentresponsehours + ':' + this.policy.urgentresponseminutes;
    // tslint:disable-next-line: max-line-length
    opost.Urgentresolutiontime = this.policy.urgentresolutionday + ':' + this.policy.urgentresolutionhours + ':' + this.policy.urgentresolutionminutes;
    // tslint:disable-next-line: max-line-length
    opost.Highresponsetime = this.policy.highresponseday + ':' + this.policy.highresponsehours + ':' + this.policy.highresponseminutes;
    // tslint:disable-next-line: max-line-length
    opost.Highresolutiontime = this.policy.highresolutionday + ':' + this.policy.highresolutionhours + ':' + this.policy.highresolutionminutes;
    // tslint:disable-next-line: max-line-length
    opost.Mediumresponsetime = this.policy.mediumresponseday + ':' + this.policy.mediumresponsehours + ':' + this.policy.mediumresponseminutes;
    // tslint:disable-next-line: max-line-length
    opost.Mediumresolutiontime = this.policy.mediumresolutionday + ':' + this.policy.mediumresolutionhours + ':' + this.policy.mediumresolutionminutes;
    // tslint:disable-next-line: max-line-length
    opost.Lowresponsetime = this.policy.lowresponseday + ':' + this.policy.lowresponsehours + ':' + this.policy.lowresponseminutes;
    // tslint:disable-next-line: max-line-length
    opost.Lowresolutiontime = this.policy.lowresolutionday + ':' + this.policy.lowresolutionhours + ':' + this.policy.lowresolutionminutes;

    this.slaservice.update(opost).subscribe(data => {
      this.loading = false;
      this.toastr.success('SLA Policy Updated Successfully !', 'Updated !');
      this.router.navigate(['settings/policies/viewpolicies']);
   });
  }

}
