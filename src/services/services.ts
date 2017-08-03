import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConstData } from "./const";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
@Injectable()
export class Services {
	

  constructor(private constdata: ConstData, private http: Http) {

  }

  // getJobs(pageNumber, filterUrl): Promise<Object> {
  //     let realUrl = '';
  //     if(!!filterUrl) {
  //         realUrl = this.constdata.jobsUrl+filterUrl + "&page="+pageNumber;
  //     } else {
  //         realUrl = this.constdata.jobsUrl+"?page="+pageNumber;
  //     }
  //     console.log("realurl", realUrl);
  //       return new Promise((resolve, reject) => {
  //           this.http.get(realUrl)
  //               .map(response => response.json())
  //               .subscribe(response => resolve(response.data),error => reject(error)
  //               );
  //       });
  //   }

  getJobs(pageNumber, filterUrl):Observable<any> {
      let realUrl = '';
      if(!!filterUrl) {
          realUrl = this.constdata.jobsUrl+filterUrl + "&page="+pageNumber;
      } else {
          realUrl = this.constdata.jobsUrl+"?page="+pageNumber;
      }
        return  this.http.get(realUrl)
                .map(this.checkForError)
                .catch(err => Observable.throw(err))
                .map(this.getJson);
    }

    getEvents(): Promise<Object> {
        return new Promise((resolve, reject) => {
            this.http.get(this.constdata.eventsUrl)
                .map(response => response.json())
                .subscribe(response => resolve(response.data),error => reject(error)
                );
        });
    }

    getNews(): Promise<Object> {
        return new Promise((resolve, reject) => {
            this.http.get(this.constdata.newsUrl)
                .map(response => response.json())
                .subscribe(response => resolve(response.posts),error => reject(error)
                );
        });
    }

    getJobIndustry(): Observable<any> {
        return  this.http.get(this.constdata.filterUrl+1)
                .map(this.checkForError)
                .catch(err => Observable.throw(err))
                .map(this.getJson);
        
    }
    getJobType():Observable<any> {
        return  this.http.get(this.constdata.filterUrl+3)
                .map(this.checkForError)
                .catch(err => Observable.throw(err))
                .map(this.getJson);
    }
    getEducation():Observable<any> {
        return  this.http.get(this.constdata.filterUrl+5)
                .map(this.checkForError)
                .catch(err => Observable.throw(err))
                .map(this.getJson);
    }
    getCounty():Observable<any> {
        return  this.http.get(this.constdata.filterUrl+4)
                .map(this.checkForError)
                .catch(err => Observable.throw(err))
                .map(this.getJson);
    }

    private checkForError(response: Response): Response {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          let error = new Error(response.statusText);
          error['response'] = response;
          console.error(error);
          throw error;
        }
      }
    private getJson(response: Response) {
      return response.json();
    }

  
}
