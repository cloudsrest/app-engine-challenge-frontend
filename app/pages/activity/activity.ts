import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {RecognitionProvider} from "../../providers/recognition/recognition-provider";
import {Recognition} from "../../models/recognition/recognition";
import {UserProvider} from "../../providers/user/user-provider";
import {User} from "../../models/user/user";
import {LoginPage} from "../login/login";
import {TimeAgoPipe} from "angular2-moment";
import {RecognitionCreateModal} from "../recognition-create-modal/recognition-create-modal";

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

  constructor(private navCtrl: NavController, private recData: RecognitionProvider, private userData: UserProvider, private modalCtrl: ModalController) {
    this.recognitions = [];
    this.currentView = ActivityPage.ACTIVITY.recent;
  }

  onPageWillEnter() {
    this.userData.currentUser().subscribe((currentUser: User) => {
      if (!currentUser) {
        // there is no user logged in -- navigate to login page to avoid 401 and a blank page
        this.navCtrl.setRoot(LoginPage);
      } else {
        this.loadAllRecognitions();
      }
    });
  }

  openRecognitionCreate() {
    let modal = this.modalCtrl.create(RecognitionCreateModal);
    modal.onDidDismiss((data?:any) => {
      if (data) {
        this.loadAllRecognitions(true);
      }
    });
    modal.present();
  }

  loadAllRecognitions(reload?: boolean) {
    this.recData.load(reload).subscribe((recognitions: Recognition[]) => {
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
