import { Component, OnInit } from '@angular/core';
import { GetDetailsService } from '../service/get-details.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sachin',
  templateUrl: './sachin.component.html',
  styleUrls: ['./sachin.component.css']
})
export class SachinComponent implements OnInit {

  constructor(private getDetailsService: GetDetailsService) { }

  ngOnInit() {
    this.getDetailsService.getDetails().subscribe(res => {
      console.log(res);
    },
    error => {
      console.log(error.message);
    }
  );
  }

}
