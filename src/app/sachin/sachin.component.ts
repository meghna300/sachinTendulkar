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
  pieChartData = [8, 10];
  pieChartLabels = ['won', 'lost'] ;
  pieChartType = 'pie';
  pieChartOptions: any;
  barChartData =  [3, 2, 1];
  barChartLabels = ['Century', 'Half Century', 'Below 50'];
  barChartType = 'bar';
  barChartOptions: any;
  detail: Detail[];
  lost = 0;
  won = 0;
  century = 0;
  halfCentury = 0;
  below50 = 0;
  constructor(private getDetailsService: GetDetailsService) { }

  ngOnInit() {
    const pie_canvas = <HTMLCanvasElement>document.getElementById('pieChartDiv');
    const pie_ctx = pie_canvas.getContext('2d');
    const bar_canvas = <HTMLCanvasElement>document.getElementById('barChartDiv');
    const bar_ctx = pie_canvas.getContext('2d');
    this.getDetailsService.getDetails().subscribe(res => {
      this.detail = res;
      console.log(this.detail);
      this.getMatchResult();
      this.getBattingScore();
    },
    error => {
      console.log(error.message);
    }
  );
  }

  getMatchResult() {
    for (let i = 0; i < this.detail.length; i++) {
      if (this.detail[i].match_result === 'won') {
        this.won = this.won + 1;
      } else {
        this.lost = this.lost + 1;
      }

    }
    this.pieChartData = [this.won, this.lost];
    this.pieChartOptions = {
      responsive: true
    };
    console.log(this.won);
    console.log(this.lost);
  }

  getBattingScore() {
   for (let i = 0; i < this.detail.length; i++) {
     if (this.detail[i].batting_score > 100 || this.detail[i].batting_score === 100) {
       this.century += 1;
     }
     if (this.detail[i].batting_score < 100 && this.detail[i].batting_score > 50) {
       this.halfCentury += 1;
     }
     if (this.detail[i].batting_score < 50) {
       this.below50 += 1;
     }
   }
    this.barChartData = [this.century, this.halfCentury, this.below50];
    this.barChartOptions = {
      responsive: true
    };
   console.log(this.century);
   console.log(this.halfCentury);
   console.log(this.below50);
  }

}
