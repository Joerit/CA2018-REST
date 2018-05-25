import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { IRailService } from './services/IRail.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StationsComponent } from './IRail/Stations.component';
import { LiveboardComponent } from './IRail/Liveboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    NavBarComponent,
    StationsComponent,
    LiveboardComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'stations', pathMatch: 'full'},
      { path: 'stations', component: StationsComponent},
      { path: 'liveboard/:id', component:LiveboardComponent},
      { path: "**", component: PageNotFoundComponent}
    ], { useHash: true }),
    FormsModule,
    HttpClientModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    IRailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
