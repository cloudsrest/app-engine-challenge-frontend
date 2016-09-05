import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Recognition} from "../../models/recognition/recognition";

@Injectable()
export class RecognitionProvider {

  static RECOGNITION_TYPES: string[] = [
    'INNOVATION',
    'CREATIVITY'
  ];

  private endpoint: string = '/api/recognitions';
  private recognitions: Recognition[];

  constructor(private http:Http) {
  }

  all(): Observable<Recognition[]> {
    return this.http.get(`${this.endpoint}/all`).map((res: Response) => {
      this.recognitions = Recognition.asRecognitions(res.json());
      return this.recognitions;
    });
  }

  allForCurrentUser(): Observable<Recognition[]> {
    return this.http.get(`${this.endpoint}/mine`).map((res: Response) => {
      return Recognition.asRecognitions(res.json());
    });
  }

  create(recognition: Recognition): Observable<Recognition> {
    return this.http.post(this.endpoint, recognition.toJson()).map((res: Response) => {
      return new Recognition(res.json());
    });
  }

  load(reload?: boolean): Observable<Recognition[]> {
    if (this.recognitions && !reload) {
      return Observable.create(observer => {
        observer.next(this.recognitions);
        observer.complete();
      });
    } else {
      return this.all();
    }
  }

  recognitionTypes(): Observable<string[]> {
    return Observable.create(observable => {
      observable.next(RecognitionProvider.RECOGNITION_TYPES);
      observable.complete();
    });
  }
}
