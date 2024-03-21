import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tempredirect',
  templateUrl: './tempredirect.component.html',
  styleUrls: ['./tempredirect.component.css']
})
export class TempredirectComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.router.navigate(['/tickets/filters/all-tickets']);
  }

}
