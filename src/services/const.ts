import { Injectable } from '@angular/core';


@Injectable()
export class ConstData {
	public apiAddress = 'https://hometownopportunity.com/api';
	public jobsUrl = this.apiAddress+'/careers.php';
	public eventsUrl = this.apiAddress+'/events.php';
  public newsUrl = 'https://hometownopportunity.com/blog/api/get_recent_posts/';

  public filterUrl = "https://hometownopportunity.com/api/options.php?id=";

  private userphoto: string= '';

  constructor() {

  }

  
}
