import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';

interface Diff {
  left: string;
  right: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DiffGetterService {

  private apiUrl = 'http://api.differ.localhost';

  constructor(private http: HttpClient) { }

  getId(diffId: string): Observable<any> {
    const urlString = this.apiUrl + '/diffs/' + diffId;
    const diffInfo = this.http.get<Diff>(urlString);
    return diffInfo;
    // return {id: 1, left: leftText, right: rightText};
  }

  setId(formResult) {
    const urlString = this.apiUrl + '/new-diff/';
    const diffId = this.http.post(urlString, formResult.value, httpOptions);
    return diffId;
  }
}

