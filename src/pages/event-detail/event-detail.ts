import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams  } from 'ionic-angular';
import { Services } from "../../services/services";
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
	public event: any;
	public isloading: boolean = false;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private iab: InAppBrowser,
   private navparams: NavParams, private socialSharing: SocialSharing, private emailComposer: EmailComposer) {
  	this.event = this.navparams.get('event');
  }


  share(event, type){
  	switch(type){
  		case 0: 
  			this.socialSharing.shareViaFacebook(this.event.name, "", 'http://hometownopportunity.com/events/detail/index.php?id='+ this.event.id).then(() => {
			  console.log("facebook");
			}).catch((err) => {
			  console.log("facebook error", err);
			});
			break;
		case 1: 
  			this.socialSharing.shareViaTwitter(this.event.name, "../assets/share.png", 'http://hometownopportunity.com/events/detail/index.php?id='+ this.event.id).then(() => {
			  console.log("shareViaTwitter");
			}).catch((err) => {
			  console.log("twitter error", err);
			});
			break;
		// case 2: 
  // 			this.socialSharing.shareViaFacebook(this.event.name, "../assets/share.png", 'http://hometownopportunity.com/events/detail/index.php?id='+ this.event.id).then(() => {
		// 	  // Sharing via email is possible
		// 	}).catch(() => {
		// 	  // Sharing via email is not possible
		// 	});
		// 	break;
		// case 3: 
  // 			this.socialSharing.canShareVia('GooglePlus').then((data) => {
		// 	  console.log("success", data);
		// 	}).catch((err) => {
		// 	  console.log("error", err);
		// 	});
		// 	break;
		case 2:
			// this.emailComposer.isAvailable().then((available: boolean) =>{
			 // if(available) {
			   let email = {
				  subject: 'Check out this article: ' + this.event.name,
				  body: 'http://hometownopportunity.com/events/detail/index.php?id='+ this.event.id,
				  isHtml: true
				};
				this.emailComposer.open(email);
			//  } else {
			//  	alert("erro");
			//  }
			// });
			
			break;
  	}
  }

  onClickLearnMore() {
  	const browser = this.iab.create(this.event.link, "_blank", "location=no");

  }

}
