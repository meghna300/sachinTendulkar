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
  pieChartColor: any;
  pieChartOptions: any;
  barChartData =  [3, 2, 1];
  barChartLabels = ['Century', 'Half Century', 'Below 50'];
  barChartType = 'bar';
  barChartColor: any;
  barChartOptions: any;
  inningData = [0, 0];
  inningLabels = ['1st inning', '2nd Inning'];
  inningType = 'bar';
  inningColor: any;
  inningOptions: any;
  detail: Detail[];
  lost = 0;
  won = 0;
  century = 0;
  halfCentury = 0;
  below50 = 0;
  firstInning = 0;
  firstInningAvg = 0;
  firstInningCount = 0;
  secInning = 0;
  secInningAvg = 0;
  secInningCount = 0;
  constructor(private getDetailsService: GetDetailsService) { }

  ngOnInit() {
    const pie_canvas = <HTMLCanvasElement>document.getElementById('pieChartDiv');
    const pie_ctx = pie_canvas.getContext('2d');
    const bar_canvas = <HTMLCanvasElement>document.getElementById('barChartDiv');
    const bar_ctx = bar_canvas.getContext('2d');
    const inning_canvas = <HTMLCanvasElement>document.getElementById('inningChartDiv');
    const inning_ctx = inning_canvas.getContext('2d');
    this.getDetailsService.getDetails().subscribe(res => {
      this.detail = res;
      console.log(this.detail);
      this.getMatchResult();
      this.getBattingScore();
      this.inningScore();
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
    this.pieChartColor = [
      {
        backgroundColor: ['rgb(253, 203, 64)', 'rgb(247, 152, 36)']
      }
    ];
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
    this.barChartColor = [
      {
        backgroundColor: ['rgb(253, 203, 64)', 'rgb(247, 152, 36)', 'rgb(247, 152, 100)']
      }
    ];
   console.log(this.century);
   console.log(this.halfCentury);
   console.log(this.below50);
  }
  inningScore() {
    for (let i = 0; i < this.detail.length; i++) {
      if (this.detail[i].batting_innings === '1st') {
        if (!isNaN(this.detail[i].batting_score)) {
          this.firstInning = this.firstInning + this.detail[i].batting_score;
          this.firstInningCount = this.firstInningCount + 1;
          console.log(this.firstInning);
        }
      }
      if (this.detail[i].batting_innings === '2nd') {
        if (!isNaN(this.detail[i].batting_score)) {
          this.secInning = this.secInning + this.detail[i].batting_score;
          this.secInningCount = this.secInningCount + 1;
        }
      }
    }
    this.firstInningAvg = this.firstInning / this.firstInningCount;
    this.secInningAvg = this.secInning / this.secInningCount;
    console.log(this.firstInningAvg);
    console.log(this.secInningAvg);
    this.inningData = [this.firstInningAvg, this.secInningAvg];
    this.inningOptions = {
      responsive: true
    };
  }
}
