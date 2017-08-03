import { Component } from '@angular/core';
import { NavController, LoadingController, ViewController, NavParams  } from 'ionic-angular';
import { Services } from "../../../services/services";

import { Observable } from "rxjs";

@Component({
  selector: 'modal-filter',
  templateUrl: 'filter-modal.html'
})
export class FilterModal {

  public jobIndustries: any[] = [];
  public jobTypes: any[] = [];
  public educations: any[] = [];
  public counties: any[] = [];
  public selectedIndustry:any[] = [];
  public selectedType: any[] = [];
  public selectedEducation: any[] = [];
  public selectedCounty: any[] = [];

  public searchKeyword: string = '';
	public selectedFilter: any = {keyword:'', industry:[], type: [], education:[], county:[] };

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private viewCtrl: ViewController, private services: Services, private navParams: NavParams) {
  	this.selectedFilter = this.navParams.get("selectedFilter");
    this.makingEachFilter(this.selectedFilter);
    this.initdata();
  }

  makingEachFilter(data){
    this.searchKeyword = data.keyword;
    this.selectedIndustry = data.industry;
    this.selectedType = data.type;
    this.selectedEducation = data.education;
    this.selectedCounty = data.county;
  }

  gettingJobIndustry(){
    
    return this.services.getJobIndustry();
  }
  gettingJobType(){
    
    return this.services.getJobType();
  }
  gettingEducation(){
    
    return this.services.getEducation();
  }
  gettingCounty(){
    
    return this.services.getCounty();
  }


  initdata(){
    let that = this;
    let loading = this.loadingCtrl.create();
    loading.present();
    Observable.forkJoin([this.gettingJobIndustry(), this.gettingJobType(), this.gettingEducation(), this.gettingCounty()])
    .finally(()=>{loading.dismiss();})
    .subscribe(([jobindustry, jobtype, education, county])=> {
      // console.log("jobindustry", jobindustry);
      // console.log("jobtype", jobtype);
      // console.log('education', education);
      // console.log("county", county);
      this.jobIndustries = jobindustry.data;
      this.jobIndustries.map(function (item) {
        if(that.selectedIndustry.indexOf(item.id)>-1) {
          item.flag = true;
        } else {
          item.flag = false;
        }
      });
      this.jobTypes = jobtype.data;
      this.jobTypes.map(function(item){
        if(that.selectedType.indexOf(item.id)>-1) {
          item.flag = true;        
        } else {
          item.flag = false;
        }
      });

      this.educations = education.data;
      this.educations.map(function(item){
        if(that.selectedEducation.indexOf(item.id)>-1) {
          item.flag = true;        
        } else {
          item.flag = false;
        }
      });
      this.counties = county.data;
      this.counties.map(function(item){
        if(that.selectedCounty.indexOf(item.id)>-1) {
          item.flag = true;        
        } else {
          item.flag = false;
        }
      });
    },
    err => {

    });
  }

  onChangeIndustry(item){
    if(item.flag) {
      this.selectedIndustry = this.selectedIndustry.concat(item.id);
    } else {
      let index = this.selectedIndustry.indexOf(item.id);
      if(index>-1){
        this.selectedIndustry.splice(index, 1);
      }
    }
    
  }

  onChangeType(item){
    if(item.flag) {
      this.selectedType = this.selectedType.concat(item.id);
    } else {
      let index = this.selectedType.indexOf(item.id);
      if(index>-1){
        this.selectedType.splice(index, 1);
      }
    }
    
  }

  onChangeEducation(item) {
    if(item.flag) {
      this.selectedEducation = this.selectedEducation.concat(item.id);
    } else {
      let index = this.selectedEducation.indexOf(item.id);
      if(index>-1){
        this.selectedEducation.splice(index, 1);
      }
    }
    
  }

  onChangeCounty(item) {
    if(item.flag) {
      this.selectedCounty = this.selectedCounty.concat(item.id);
    } else {
      let index = this.selectedCounty.indexOf(item.id);
      if(index>-1){
        this.selectedCounty.splice(index, 1);
      }
    }
    
  }

  onInput(event) {

  }

  onCancel(event) {
    this.searchKeyword = '';
  }

  onFliter() {
    let data = {keyword: this.searchKeyword, industry: this.selectedIndustry, type: this.selectedType, education: this.selectedEducation, county: this.selectedCounty};
    this.viewCtrl.dismiss(data);
  }

  

}

