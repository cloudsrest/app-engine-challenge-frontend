import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {User} from "../../models/user/user";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Storage, LocalStorage, App} from "ionic-angular";
import {LoginPage} from "../../pages/login/login";

@Injectable()
export class UserProvider {

  private endpoint: string = '/api/secure/users';
  private users: User[];
  private storage: Storage;
  private accessToken: string;

  constructor(private http:Http, private app: App) {
    this.storage = new Storage(LocalStorage);
    this.getAccessToken().then(() => {
      this.load();
    }).catch(() => {});
  }

  all(): Observable<User[]> {
    return Observable.create(observer => {
      this.getAccessToken().then(() => {
        this.http.get(this.endpoint, {headers: this.getHeaders()}).subscribe((res: Response) => {
          this.users = User.asUsers(res.json());
          observer.next(this.users);
          observer.complete();
        });
      }).catch(() => {
        observer.error();
        observer.complete();
      });
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
    return Observable.create(observer => {
      this.getAccessToken().then(() => {
        this.http.get(`${this.endpoint}/me`, {headers: this.getHeaders()}).subscribe((res: Response) => {
          observer.next(new User(res.json()));
          observer.complete();
        }, (err) => {
          if (err.status === 401) {
            // TODO try to reauth with refresh token?
            observer.error(err);
            observer.complete();
          } else {
            observer.error(err);
            observer.complete();
          }
        });
      }).catch(() => {
        observer.error();
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

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.accessToken}`);
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
