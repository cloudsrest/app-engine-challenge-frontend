import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Recognition} from "../../models/recognition/recognition";

@Injectable()
export class RecognitionProvider {

  private endpoint: string = '/recognitions';
  private recognitions: Recognition[];

  constructor(private http:Http) {
  }

  all(): Observable<any> {
    // return this.http.get(`${this.endpoint}/all`).map((res: Response) => {
    return this.http.get('data/recognition-data.json').map((res: Response) => { // TODO mock only
      this.recognitions = Recognition.asRecognitions(res.json());
      return this.recognitions;
    });
  }

  allForCurrentUser(): Observable<any> {
    // return this.http.get(`${this.endpoint}/mine`).map((res: Response) => {
    return this.http.get('data/recognition-data-cu.json').map((res: Response) => { // TODO mock only
      return Recognition.asRecognitions(res.json());
    });
  }

  create(recognition: Recognition): Observable<any> {
    return this.http.post(this.endpoint, recognition.toJson()).map((res: Response) => {
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
}
