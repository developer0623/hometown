import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NewsDetailPage } from "../news-detail/news-detail";
import { Services } from "../../services/services";
@Component({
  selector: 'page-news-list',
  templateUrl: 'news-list.html'
})
export class NewsListpage {

  	public newsLists: any = [];
    public lists:any = [];
	public isloading: boolean = false;
	public imageurl: string = 'https://hometownopportunity.com/uploads/';

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private services: Services) {
  	this.gettingNews();
  }

  gettingNews(){
  	let loading = this.loadingCtrl.create();
  	loading.present();
  	this.services.getNews().then(
          response => {
          	loading.dismiss();
          	this.isloading = true;
            this.lists = response;

          	this.newsLists = this.lists.map(function(item){
              let newdate = item.date.split(' ');
              item.date = new Date(newdate[0]).getTime();
              return item;
            });
          	// console.log(response);
          }
    );
  }

  gotonewPage(news){
    
    this.navCtrl.push(NewsDetailPage, {news: news});
  }

  changeDate(ordate){
    let newdate = ordate.split(' ');

    return new Date(newdate[0]).getTime();
  }

}
