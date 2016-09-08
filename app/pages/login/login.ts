import {Component} from '@angular/core';
import {NavController, LoadingController, Storage, LocalStorage} from 'ionic-angular';
import {ActivityPage} from "../activity/activity";
import {Http, Response} from "@angular/http";

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  username: string = '';
  password: string = '';
  loginUrl: string = '/api/oauth/token';
  private storage: Storage;

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private http: Http) {
    this.storage = new Storage(LocalStorage);
  }

  public login() {
    if (this.loginIsValid()) {
      this.presentLoading();
      this.http.post(this.loginUrl, JSON.stringify({
        username: this.username,
        password: this.password,
        grant_type: 'password'
      })).subscribe((res: Response) => {
        let accessToken = res.json().access_token;
        this.storage.set('access_token', accessToken);
        this.navCtrl.setRoot(ActivityPage);
      });
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  private loginIsValid() {
    return this.username && this.password;
  }
}
