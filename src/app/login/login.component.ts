import { HelpdeskService } from 'src/app/settings/helpdesk/helpdesk.service';
import { TicketreplyService } from './../tickets/detail-ticket/ticketreply.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AgentService } from '../settings/agents/agents.service';
import { ToastrService } from 'ngx-toastr';
import { AgentClass } from '../settings/agents/agentclass';
import { CookieService } from 'ngx-cookie-service';
import { TicketforwardClass } from '../tickets/detail-ticket/ticketforwardclass';
import { Loginclass } from './loginclass';
import { environment } from 'src/environments/environment.prod';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, private agentservice: AgentService,  private toastr: ToastrService, private cookie: CookieService,
    public loginservice: LoginService, public mailservice: TicketreplyService, public helpdeskservice: HelpdeskService) { }


  url = environment.baseUrl;

  loginform = true;
  recoverform = false;
  login: any = {};

  systemdata: any = {};
  public loading: boolean;

  logindata: any = {};

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  showLoginForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  ngOnInit() {
    this.cookie.deleteAll();

    this.helpdeskservice.getbyid('7b09c997-5afa-405e-9b78-3d8e403b4169').subscribe(data => {
      this.systemdata = data;
    });
  }

  onTemplateFormSubmit(){

    this.loading = true;

    this.agentservice.authenticate(this.login.email, this.login.password).subscribe(
      data => {
        this.loading = false;

       if (data == null){
        this.toastr.error('Email and Password combination doesnt match !', 'Login Failed !');
       } else {

        var logindata = new Loginclass();

          logindata.Lguid = data['lguid'];
          logindata.Username = data['username'];
          logindata.Email = data['email'];
          logindata.Phone = data['phone'];
          logindata.Password = data['password'];
          logindata.AgGuid = data['agGu'].agGuid;
          logindata.RoleGuid = data['roleGuid'];
          logindata.Photo = data['photo'];
          logindata.Lastlogin = new Date();
          logindata.Isactive = 'Active';

          this.loginservice.update(logindata).subscribe(data => {
            });

        this.cookie.set('Guid', data['lguid']);
        this.cookie.set('RoleGuid', data['roleGuid']);
        this.toastr.success('Login Successfully !', 'Success !');
        this.router.navigate(['starter']);
       }

      }
    );
  }


  recoverpassword() {
    this.loading = true;

    this.loginservice.get().subscribe(data => {
      this.logindata = data;
      // tslint:disable-next-line: prefer-const
      let d = this.logindata.filter(m => {
          if (m.email === this.login.recoveremail) {
            return m;
          }
        });

        if (d.length === 0) {
          this.toastr.error('Email Not Exist. Please Check Your Email.', 'Error !');
          this.loading = false;
        } else {

          let autopass = this.generatepassword(6);

          var logindata = new Loginclass();

          logindata.Lguid = d[0].lguid;
          logindata.Username = d[0].username;
          logindata.Email = d[0].email;
          logindata.Phone = d[0].phone;
          logindata.Password = autopass;
          logindata.AgGuid = d[0].agGu.agGuid;
          logindata.RoleGuid = d[0].roleGuid;
          logindata.Photo = d[0].photo;
          logindata.Isactive = d[0].isactive;

          this.loginservice.update(logindata).subscribe(
            datalog => {
            });

          var tickfor = new TicketforwardClass();
          tickfor.Email = d[0].email;
          // tslint:disable-next-line: max-line-length
          tickfor.Description = 'Your request for recover your password has been sent. Here it is your new password - ' + autopass + ' . Thank You. Team Arise Solar';

          this.mailservice.getforward(tickfor).subscribe(data => {
            this.toastr.success('Please Check Your E-Mail for more information !', 'Check Your Email!');
            this.showLoginForm();
            this.login.recoveremail = '';
            this.loading = false;
          });

        }
    });
  }

  generatepassword(length) {
    let result           = '';
    // tslint:disable-next-line: prefer-const
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // tslint:disable-next-line: prefer-const
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

}
