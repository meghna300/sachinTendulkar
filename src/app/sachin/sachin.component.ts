import { Component, OnInit } from '@angular/core';
import { GetDetailsService } from '../service/get-details.service';
import { HttpClient } from '@angular/common/http';
import { Detail } from '../detail';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sachin',
  templateUrl: './sachin.component.html',
  styleUrls: ['./sachin.component.css']
})
export class SachinComponent implements OnInit {
  public pieChartData = [8, 10];
  public pieChartLabels = ['won', 'lost'] ;
  public pieChartType = 'pie';
  public pieChartOptions: any;
   detail: Detail[];
  lost: number;
  won: number;
  constructor(private getDetailsService: GetDetailsService) { }

  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('pieChartDiv');
    const ctx = canvas.getContext('2d');
    // this.pieChartData = [8, 10];
    // this.pieChartLabels = ['won', 'lost'];
    // this.pieChartType = 'pie';
    this.pieChartOptions = {
      responsibe: true
    };
    console.log(this.pieChartData);
    this.getDetailsService.getDetails().subscribe(res => {
      this.detail = res;
      console.log(this.detail);
      this.getMatchResult();
    },
    error => {
      console.log(error.message);
    }
  );
  }

  getMatchResult() {
    this.won = 0;
    this.lost = 0;
    for (let i = 0; i < this.detail.length; i++) {
      if (this.detail[i].match_result === 'won') {
        this.won = this.won + 1;
      } else {
        this.lost = this.lost + 1;
      }

    }
    console.log(this.won);
    console.log(this.lost);
  }

}
