import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-viewroles',
  templateUrl: './viewroles.component.html',
  styleUrls: ['./viewroles.component.css']
})
export class ViewrolesComponent implements OnInit {

  roles: any = {};
  id: any;
  agents: any = {};

  url = environment.baseUrl;
  public loading = false;

  public loadingmodal = false;

  constructor(private roleservice: RoleService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loading = true;
    this.roleservice.get().subscribe(data => {
     this.roles = data;
     this.loading = false;
   });
  }


  agentmodal(agentscontent, data) {
    this.loadingmodal = true;
    this.modalService.open(agentscontent, { centered: true });
    this.roleservice.getbyid(data).subscribe(data1=>{
      this.loadingmodal = false;
        this.agents = data1['agents'];
     });
  }


  deletemodal(deletecontect, data) {
    this.modalService.open(deletecontect, { centered: true, size: 'sm' });
    this.id = data;
  }

  Delete(guid) {
    this.loading = true;
     this.roleservice.delete(guid).subscribe(data=>{
      this.toastr.error('Role Deleted Successfully !', 'Deleted !');
       this.ngOnInit();
       this.loading = false;
       this.modalService.dismissAll();
     });
   }


}
