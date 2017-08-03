import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { JobsListpage } from '../pages/jobs-list/jobs-list';
import { EventsListpage } from '../pages/events-list/events-list';
import { NewsListpage } from '../pages/news-list/news-list';
import { MoreInfoPage } from '../pages/moreinfo/moreinfo';
import { JobDetailPage } from '../pages/job-detail/job-detail';
import { EventDetailPage } from "../pages/event-detail/event-detail";
import { NewsDetailPage } from "../pages/news-detail/news-detail";
import { FilterModal } from "../pages/jobs-list/filter-modal/filter-modal";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConstData } from '../services/const';
import { Services } from "../services/services";
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    JobsListpage,
    FilterModal,
    EventsListpage,
    NewsListpage,
    JobDetailPage,
    EventDetailPage,
    NewsDetailPage,
    MoreInfoPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    JobsListpage,
    FilterModal,
    EventsListpage,
    NewsListpage,
    JobDetailPage,
    EventDetailPage,
    NewsDetailPage,
    MoreInfoPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConstData,
    Services,
    SocialSharing,
    EmailComposer,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
