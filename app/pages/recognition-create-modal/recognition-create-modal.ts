import {Component} from "@angular/core";
import {RecognitionProvider} from "../../providers/recognition/recognition-provider";
import {ViewController} from "ionic-angular";
import {UserProvider} from "../../providers/user/user-provider";
import {User} from "../../models/user/user";
import {Recognition} from "../../models/recognition/recognition";

@Component({
  templateUrl: './build/pages/recognition-create-modal/recognition-create-modal.html',
  providers: [RecognitionProvider, UserProvider]
})

export class RecognitionCreateModal {

  users: User[];
  recognitionTypes: string[];
  currentUser: User;
  recognitionUser: number;
  recognitionType: string;
  recognitionComment: string;

  constructor(private recognitionProvider: RecognitionProvider, private viewCtrl: ViewController, private userProvider: UserProvider) {
    this.userProvider.load().subscribe((users: User[]) => {
      this.users = users;
    });
    this.userProvider.currentUser().subscribe((currentUser: User) => {
      this.currentUser = currentUser;
    });
    this.recognitionProvider.recognitionTypes().subscribe((types: string[]) => {
      this.recognitionTypes = types;
    });
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  save() {
    let recognition = new Recognition({
      toUserId: this.recognitionUser,
      fromUserId: this.currentUser.getId(),
      type: this.recognitionType,
      comment: this.recognitionComment
    });

    this.recognitionProvider.create(recognition).subscribe((res: Recognition) => {
      this.dismiss(res);
    }, () => {
      this.dismiss();
    });
  }

}
