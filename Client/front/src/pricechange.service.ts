import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const url = 'https://localhost:7050/api/pricechange';

@Injectable({
  providedIn: 'root'
})
export class PricechangeService {

  constructor(private http: HttpClient) { }

  addItem(item: any): Observable<any> {
    return this.http.post(url, item);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(url);
  }
}
