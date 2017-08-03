import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { EventDetailPage } from "../event-detail/event-detail";
import { Services } from "../../services/services";

@Component({
  selector: 'page-events-list',
  templateUrl: 'events-list.html'
})
export class EventsListpage {

	public eventsLists: any = [];
	public isloading: boolean = false;
	public imageurl: string = 'https://hometownopportunity.com/uploads/';

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private services: Services) {
  	this.gettingEvents();
  }

  gettingEvents(){
  	let loading = this.loadingCtrl.create();
  	loading.present();
  	this.services.getEvents().then(
          response => {
          	loading.dismiss();
          	this.isloading = true;
          	this.eventsLists = response;
          	console.log(response);
          }
    );
  }

  gotonewPage(event){
    
    this.navCtrl.push(EventDetailPage, {event: event});
  }

}
