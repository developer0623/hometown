import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController  } from 'ionic-angular';
import { Services } from "../../services/services";
import { JobDetailPage } from "../job-detail/job-detail";
import { FilterModal } from "./filter-modal/filter-modal";
@Component({
  selector: 'page-jobs-list',
  templateUrl: 'jobs-list.html'
})
export class JobsListpage {
	public jobLists: any = [];
	public isloading: boolean = false;
	public imageurl: string = 'https://hometownopportunity.com/uploads/';
  public pageNumber: number= 1;
  public selectedFilter: any = {keyword:'', industry:[], type: [], education:[], county:[] };
  public filterUrl: string = '';
  private filterFlag: boolean =false;
  private pageCount: any;
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private services: Services) {
  	this.gettingJobs();
  }

  gettingJobs(){
  	let loading = this.loadingCtrl.create();
  	loading.present();
    this.pageNumber = 1;

   this.services.getJobs(this.pageNumber, this.filterUrl)
   .subscribe(response=>{
     loading.dismiss();
     this.isloading = true;
     this.jobLists = response.data;
     this.pageCount = response.pages;

   }, err=>{
     loading.dismiss();

   });
  }

  gotonewPage(job){
    
    this.navCtrl.push(JobDetailPage, {job: job});
  }

  doInfinite(infiniteScroll) {
    this.pageNumber ++;
    if(this.pageNumber>this.pageCount){
      infiniteScroll.complete();
    } else {
      this.services.getJobs(this.pageNumber, this.filterUrl)
     .subscribe(response=>{
       
       this.jobLists = this.jobLists.concat(response.data);
       infiniteScroll.complete();

     });
   }   

  }
  
  onFilter() {
    let filtermodal = this.modalCtrl.create(FilterModal, {selectedFilter: this.selectedFilter});
    filtermodal.onDidDismiss(data=> {
      this.selectedFilter = data;
      this.makingUrl(data);
    });
    filtermodal.present();
  }

  makingUrl(filterdata){
    this.filterUrl = '';
    let that = this;
    if(!!filterdata.keyword) {
      this.filterUrl =  '?keyword='+ filterdata.keyword;
    }

    if(filterdata.industry.length>0) {
      filterdata.industry.map(function(item){
        if(!!that.filterUrl) {
          that.filterUrl +="&cat[]="+item;
        } else {
          that.filterUrl ="?cat[]="+item;
        }
        
      });
    }

    if(filterdata.type.length>0) {
      filterdata.type.map(function(item){
        if(!!that.filterUrl) {
          that.filterUrl +="&type[]="+item;
        } else {
          that.filterUrl ="?type[]="+item;
        }
        
      });
    }

    if(filterdata.education.length>0) {
      filterdata.education.map(function(item){
        if(!!that.filterUrl) {
          that.filterUrl +="&education[]="+item;
        } else {
          that.filterUrl ="?education[]="+item;
        }
        
      });
    }

    if(filterdata.county.length>0) {
      filterdata.county.map(function(item){
        if(!!that.filterUrl) {
          that.filterUrl +="&county[]="+item;
        } else {
          that.filterUrl ="?county[]="+item;
        }
        
      });
    }

    if(!!this.filterUrl) {
      this.filterFlag = true;
    } else {
      this.filterFlag = false;
    }
    this.gettingJobs();


  }

  

}
