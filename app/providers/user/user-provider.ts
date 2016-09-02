import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {User} from "../../models/user/user";
import {Observable} from "rxjs";
import 'rxjs/Rx';

@Injectable()
export class UserProvider {

  private endpoint: string = '/users';
  private requestOptions: RequestOptions;
  private users: User[];

  constructor(private http:Http) {
    this.load();
  }

  all(): Observable<User[]> {
    return this.http.get(this.endpoint).map((res: Response) => {
      this.users = User.asUsers(res.json());
      return this.users;
    });
  }

  get(id: number): Observable<User> {
    return Observable.create(observer => {
      this.load().subscribe((users: User[]) => {
        users = users.filter((user:User) => {
          return user.getId() === id;
        });
        observer.next(users[0]);
        observer.complete();
      });
    });
  }

  load(): Observable<User[]> {
    if (this.users) {
      return Observable.create(observer => {
        observer.next(this.users);
        observer.complete();
      });
    } else {
      return this.all();
    }
  }
}
