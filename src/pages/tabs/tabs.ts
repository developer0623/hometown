import { Component } from '@angular/core';

import {  JobsListpage } from '../jobs-list/jobs-list';
import { EventsListpage } from '../events-list/events-list';
import { NewsListpage } from '../news-list/news-list';
import { MoreInfoPage } from "../moreinfo/moreinfo";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = JobsListpage;
  tab2Root = EventsListpage;
  tab3Root = NewsListpage;
  tab4Root = MoreInfoPage;

  constructor() {

  }
}
