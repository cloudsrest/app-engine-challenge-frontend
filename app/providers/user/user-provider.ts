import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {User} from "../../models/user/user";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Storage, LocalStorage} from "ionic-angular";

@Injectable()
export class UserProvider {

  private endpoint: string = 'api/users';
  private users: User[];
  private storage: Storage;

  constructor(private http:Http) {
    this.storage = new Storage(LocalStorage);
    this.load();
  }

  all(): Observable<User[]> {
    return this.http.get(this.endpoint, {headers: this.getHeaders()}).map((res: Response) => {
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

  currentUser(): Observable<User> {
    return this.http.get('/me', {headers: this.getHeaders()}).map((res: Response) => {
      return new User(res.json());
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

  private getHeaders() {
    let headers = new Headers();
    let accessToken = this.storage.get('access_token');
    headers.append('Authorization', `Basic ${accessToken}`);
    return headers;
  }
}
