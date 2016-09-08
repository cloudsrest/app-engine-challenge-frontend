import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Recognition} from "../../models/recognition/recognition";
import {Storage, LocalStorage} from "ionic-angular";

@Injectable()
export class RecognitionProvider {

  private endpoint: string = '/api/recognitions';
  private recognitions: Recognition[];
  private storage: Storage;

  constructor(private http:Http) {
    this.storage = new Storage(LocalStorage);
  }

  all(): Observable<any> {
    return this.http.get(`${this.endpoint}/all`, {headers: this.getHeaders()}).map((res: Response) => {
      this.recognitions = Recognition.asRecognitions(res.json());
      return this.recognitions;
    });
  }

  allForCurrentUser(): Observable<any> {
    return this.http.get(`${this.endpoint}/mine`, {headers: this.getHeaders()}).map((res: Response) => {
      return Recognition.asRecognitions(res.json());
    });
  }

  create(recognition: Recognition): Observable<any> {
    return this.http.post(this.endpoint, recognition.toJson(), {headers: this.getHeaders()}).map((res: Response) => {
      return new Recognition(res.json());
    });
  }

  load(): Observable<Recognition[]> {
    if (this.recognitions) {
      return Observable.create(observer => {
        observer.next(this.recognitions);
        observer.complete();
      });
    } else {
      return this.all();
    }
  }

  private getHeaders() {
    let headers = new Headers();
    let accessToken = this.storage.get('access_token');
    headers.append('Authorization', `Basic ${accessToken}`);
    return headers;
  }
}
