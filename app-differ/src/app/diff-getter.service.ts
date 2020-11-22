import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

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

  apiUrl: string;

  constructor(private http: HttpClient) { }


  getId(diffId: string): Observable<any> {
    const urlString = this.getEnvUrl() + '/diffs/' + diffId;
    const diffInfo = this.http.get<Diff>(urlString);
    return diffInfo;
    // return {id: 1, left: leftText, right: rightText};
  }

  setId(formResult) {
    const urlString = this.getEnvUrl() + '/new-diff/';
    console.log("setID urlString: " + urlString);
    const diffId = this.http.post(urlString, formResult.value, httpOptions);
    return diffId;
  }

  getEnvUrl() {
    let urlBase;
    if (environment.production === true) {
      urlBase = 'http://differ.bubtaylor.com/api/';
    }
    else {
      urlBase = 'http://localhost/api/';
    }
    console.log('Got API url.' + urlBase);
    return urlBase;
  }
}

