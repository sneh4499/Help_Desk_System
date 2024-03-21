import { Groupclass } from './../groupclass';
import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BussinesshoursService } from '../../bussiness_hours/bussinesshours.service';
import { AgentService } from '../../agents/agents.service';

@Component({
  selector: 'app-viewgroups',
  templateUrl: './viewgroups.component.html',
  styleUrls: ['./viewgroups.component.css']
})
export class ViewgroupsComponent implements OnInit {

  groupdata: any = {};
  group: any = {};
  bussinesshoursdrop: any = {};
  agentdropd: any = {};
  id: any;
  public loading: boolean;
  public loadingtbl: boolean;
  public loadingdata =  false;

  constructor(private bs: BussinesshoursService, private gs: GroupService, private modalService: NgbModal, private toastr: ToastrService,
    private agentservice: AgentService) { }

  ngOnInit() {
    this.loadingtbl = true;
    this.gs.get().subscribe(
      data => {
        this.loadingtbl = false;
       this.groupdata = data;
      }
    );
    this.bs.get().subscribe(data => {
      this.bussinesshoursdrop = data;
   });

   this.agentservice.get().subscribe(data => {
    this.agentdropd = data;
 });
  }

  deletemodal(deletecontect, data) {
    this.modalService.open(deletecontect);
    this.id = data;
  }

  Delete(guid) {
     this.gs.delete(guid).subscribe(data=>{
      this.toastr.error('Group Deleted Successfully !', 'Deleted !');
       this.ngOnInit();
       this.modalService.dismissAll();
     });
   }


   editmodal(editcontect, data1){
     this.loadingdata=true;
    this.modalService.open(editcontect, { centered: true, size: 'lg' });
    this.id = data1;

    this.gs.getbyid(data1).subscribe(
      data => {
        this.loadingdata=false;
       this.group = data;
      }
    );
   }
   update(){
    this.loading = true;

    var opost = new Groupclass();
    opost = this.group;
    opost.Esctime = this.group.esctime;
    opost.Escmailto = this.group.escmailto;

    this.gs.update(opost).subscribe(
      data => {
        this.toastr.success('Group Updated Successfully !', 'Updated !');
        this.ngOnInit();
        this.modalService.dismissAll();
        this.loading = false;
      });

   }

}
