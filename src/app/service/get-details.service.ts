import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Detail } from '../detail';

@Injectable()
export class GetDetailsService {
 url = '../assets/csvjson.json';
  constructor( private http: HttpClient) { }
  public getDetails() {
    return this.http.get<Detail[]>(this.url);
  }
}
