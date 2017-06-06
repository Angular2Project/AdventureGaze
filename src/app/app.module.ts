import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import {AngularFireModule, AuthProviders , AuthMethods} from 'angularfire2'; 
import {FirebaseService} from './services/firebase.service';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { UniquePipe } from './unique.pipe';
import { FilterPipe } from './filter.pipe';
import { ListComponent } from './components/list/list.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ProfileComponent } from './components/profile/profile.component';



export const firebaseConfig = {
    apiKey: "AIzaSyDjr-FagC486UwEocAfK_8K4O3OfHh64t8",
    authDomain: "adventuregaze-f1bbc.firebaseapp.com",
    databaseURL: "https://adventuregaze-f1bbc.firebaseio.com",
    projectId: "adventuregaze-f1bbc",
    storageBucket: "adventuregaze-f1bbc.appspot.com",
    messagingSenderId: "1010724689434"
 };
 
 
 const firebaseAuthConfig = {
	 provider : AuthProviders.Google,
	 method : AuthMethods.Popup
};
 
 
const appRoutes : Routes = [
    {
        path:'',
        component: HomeComponent
    },{
		path: 'listing/:id',
        component: ListingComponent
	},
	
    {
        path: 'listings',
        component: ListingsComponent
    },{
		path: 'list/:id',
        component: ListComponent
	},{
		path: 'groups',
        component: GroupsComponent
	},{
        path: 'profile',
        component: ProfileComponent
    },
	{
        path: 'add-listings',
        component: AddListingComponent
    }
]    
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
	FilterPipe,
    UniquePipe,
    ListComponent,
    GroupsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	FlashMessagesModule,
	RouterModule.forRoot(appRoutes),
	AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)  
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }