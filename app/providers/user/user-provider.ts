import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {User} from "../../models/user/user";
import {Observable} from "rxjs";
import 'rxjs/Rx';

@Injectable()
export class UserProvider {

  private endpoint: string = '/users';
  private requestOptions: RequestOptions;

  constructor(private http:Http) {
  }

  all(): Observable<any> {
    return this.http.get(this.endpoint).map((res: Response) => {
      return User.asUsers(res.json());
    });
  }
}
