import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {RecognitionProvider} from "../../providers/recognition/recognition-provider";
import {Recognition} from "../../models/recognition/recognition";
import {UserProvider} from "../../providers/user/user-provider";
import {User} from "../../models/user/user";
import {LoginPage} from "../login/login";
import {TimeAgoPipe} from "angular2-moment";

@Component({
  templateUrl: 'build/pages/activity/activity.html',
  pipes: [TimeAgoPipe]
})
export class ActivityPage {

  static ACTIVITY: any = {
    recent: 'recent',
    notifications: 'notifications'
  };
  recognitions: Recognition[];
  currentView: string;

  constructor(private navCtrl: NavController, private recData: RecognitionProvider, private userData: UserProvider) {
    this.recognitions = [];
    this.currentView = ActivityPage.ACTIVITY.recent;
  }

  onPageWillEnter() {
    this.userData.currentUser().subscribe(() => {
      // current user is logged in
      this.loadAllRecognitions();
    }, () => {
      // revert to login page
      this.navCtrl.setRoot(LoginPage);
    });
  }

  loadAllRecognitions() {
    this.recData.load().subscribe((recognitions: Recognition[]) => {
      this.recognitions = this.mapUsersToRecognitions(recognitions);
    });
  }

  loadRecognitionsForCurrentUser() {
    this.recData.allForCurrentUser().subscribe((recognitions: Recognition[]) => {
      this.recognitions = this.mapUsersToRecognitions(recognitions);
    });
  }

  showRecentActivity() {
    this.currentView = ActivityPage.ACTIVITY.recent;
    this.loadAllRecognitions();
  }

  showNotifications() {
    this.currentView = ActivityPage.ACTIVITY.notifications;
    this.loadRecognitionsForCurrentUser();
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
