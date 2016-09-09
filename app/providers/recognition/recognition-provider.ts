import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Recognition} from "../../models/recognition/recognition";
import {Storage, LocalStorage} from "ionic-angular";

@Injectable()
export class RecognitionProvider {

  static RECOGNITION_TYPES: string[] = [
    'INNOVATION',
    'CREATIVITY',
    'TEAM_WORK',
    'HARD_WORK'
  ];

  private endpoint: string = '/api/secure/recognitions';
  private recognitions: Recognition[];
  private storage: Storage;
  private accessToken: string;

  constructor(private http: Http) {
    this.storage = new Storage(LocalStorage);
  }

  all(): Observable<Recognition[]> {
    return Observable.create(observer => {
      this.getAccessToken().then(() => {
        this.http.get(`${this.endpoint}/all`, {headers: this.getHeaders()}).subscribe((res: Response) => {
          this.recognitions = Recognition.asRecognitions(res.json());
          observer.next(this.recognitions);
          observer.complete();
        }, (err) => {
          observer.error(err);
          observer.complete();
        });
      }).catch(() => {
        observer.error();
        observer.complete();
      });
    });
  }

  allForCurrentUser(): Observable<Recognition[]> {
    return Observable.create(observer => {
      this.getAccessToken().then(() => {
        this.http.get(`${this.endpoint}/mine`, {headers: this.getHeaders()}).subscribe((res: Response) => {
          observer.next(Recognition.asRecognitions(res.json()));
          observer.complete();
        }, (err) => {
          observer.error(err);
          observer.complete();
        });
      }).catch(() => {
        observer.error();
        observer.complete();
      });
    });
  }

  create(recognition: Recognition): Observable<Recognition> {
    return Observable.create(observer => {
      this.getAccessToken().then(() => {
        this.http.post(this.endpoint, recognition.toJson(), {headers: this.getHeaders()}).subscribe((res: Response) => {
          observer.next(new Recognition(res.json()));
          observer.complete();
        }, (err) => {
          observer.error(err);
          observer.complete();
        });
      }).catch(() => {
        observer.error();
        observer.complete();
      });
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

  private getHeaders() {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.accessToken}`);
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private getAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.storage.get('access_token').then((accessToken: string) => {
        if (accessToken) {
          this.accessToken = accessToken;
          resolve(accessToken);
        } else {
          reject();
        }
      });
    });
  }
}
