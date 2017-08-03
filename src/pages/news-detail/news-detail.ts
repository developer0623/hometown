import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams  } from 'ionic-angular';
import { Services } from "../../services/services";


@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html'
})
export class NewsDetailPage {
	public news: any;
	public isloading: boolean = false;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController,
   private navparams: NavParams) {
  	this.news = this.navparams.get('news');
  }

  changeDate(ordate){
    return new Date(ordate).getTime();
  }


}
