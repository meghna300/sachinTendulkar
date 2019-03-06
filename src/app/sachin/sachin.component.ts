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
  Piechart: any[];
   detail: Detail[];
  lost: number;
  won: number;
  constructor(private getDetailsService: GetDetailsService) { }

  ngOnInit() {
    this.getDetailsService.getDetails().subscribe(res => {
      this.detail = res;
      console.log(this.detail);
      this.getMatchResult();
      const canvas = <HTMLCanvasElement> document.getElementById('pieChartDiv');
      const ctx = canvas.getContext('2d');
      this.Piechart = new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: [{
            data: [this.won, this.lost]
          }],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
            'Won',
            'Lost'
          ]
        },
        option: {
          backgroundColor: ['#ffe63b', '#eeeeee']
        }

      });
      console.log(this.Piechart);
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
