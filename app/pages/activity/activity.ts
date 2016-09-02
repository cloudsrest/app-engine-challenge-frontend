import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {RecognitionProvider} from "../../providers/recognition/recognition-provider";
import {Recognition} from "../../models/recognition/recognition";
import {UserProvider} from "../../providers/user/user-provider";
import {User} from "../../models/user/user";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'build/pages/activity/activity.html'
})
export class ActivityPage {

  recognitions: Recognition[];

  constructor(private navCtrl: NavController, private recData: RecognitionProvider, private userData: UserProvider) {
    this.recognitions = [];
  }

  onPageWillEnter() {
    this.userData.currentUser().subscribe((currentUser: User) => {
      if (!currentUser) {
        // there is no user logged in -- navigate to login page to avoid 401 and a blank page
        this.navCtrl.setRoot(LoginPage);
      } else {
        this.recData.all().subscribe((recognitions: Recognition[]) => {
          this.recognitions = this.mapUsersToRecognitions(recognitions);
        });
      }
    });
  }

  private mapUsersToRecognitions(recognitions) {
    return recognitions.map((recognition: Recognition) => {
      this.userData.get(recognition.getToUserId()).subscribe((user: User) => {
        recognition.setToUser(user);
      });
      this.userData.get(recognition.getFromUserId()).subscribe((user: User) => {
        recognition.setFromUser(user);
      });
      return recognition;
    });
  }

}
