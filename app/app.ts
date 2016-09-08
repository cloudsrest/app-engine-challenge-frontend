import {Component} from '@angular/core';
import {ionicBootstrap, Platform, LocalStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {RecognitionProvider} from "./providers/recognition/recognition-provider";
import {UserProvider} from "./providers/user/user-provider";
import {ActivityPage} from "./pages/activity/activity";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [UserProvider, RecognitionProvider]
})
export class MyApp {
  rootPage: any = ActivityPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
