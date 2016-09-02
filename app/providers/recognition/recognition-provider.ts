import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Recognition} from "../../models/recognition/recognition";

@Injectable()
export class RecognitionProvider {

  private endpoint: string = '/recognitions';
  private requestOptions: RequestOptions;

  constructor(private http:Http) {
  }

  all(): Observable<any> {
    // return this.http.get(`${this.endpoint}/all`).map((res: Response) => {
    return this.http.get('data/recognition-data.json').map((res: Response) => { // TODO mock only
      return Recognition.asRecognitions(res.json());
    });
  }

  allByCurrentUser(): Observable<any> {
    return this.http.get(`${this.endpoint}/mine`).map((res: Response) => {
      return Recognition.asRecognitions(res.json());
    });
  }

  create(recognition: Recognition): Observable<any> {
    return this.http.post(this.endpoint, recognition.toJson()).map((res: Response) => {
      return new Recognition(res.json());
    });
  }
}
