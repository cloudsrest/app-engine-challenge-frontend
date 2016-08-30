import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController) {
  }

  public login() {
    this.presentLoading();
    // TODO call back end to send login request
    // TODO navigate to dashboard page
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  private loginIsValid() {
    return this.email && this.password;
  }
}
