
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  listings : FirebaseListObservable<any[]>;
  listing : FirebaseObjectObservable<any[]>;
  groups : FirebaseListObservable<any[]>;
  folder : any;
  constructor(private af : AngularFire) {
     this.folder = 'listingimages';
  }
  
   getListings() {
	   this.listings = this.af.database.list('/places') as FirebaseListObservable<Listing[]>
		return this.listings;
   }
   getGroups() {
	   this.listings = this.af.database.list('/groups') as FirebaseListObservable<Group[]>
	   return this.listings;
    }
   
   getListingDetails(id){
	   this.listing = this.af.database.object('/places/' + id ) as FirebaseObjectObservable<Listing>
	   return this.listing;
	   //console.log(this.listing);
	   
   }
    addGroup(group){
		this.listings = this.af.database.list('/groups') as FirebaseListObservable<Group[]>
		return this.listings.push(group);
	}
	
	updateGroup(id,group) {
		this.listings = this.af.database.list('/groups') as FirebaseListObservable<Group[]>
		return this.listings.update(id,group);
	}
   
   addListing(listing){
	   
	   let storageRef = firebase.storage().ref();
	   for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
	   let path = `/${this.folder}/${selectedFile.name}`;
		   let iRef = storageRef.child(path);
		   iRef.put(selectedFile).then((snapshot) => {
			   listing.image = selectedFile.name;
			   listing.path = path;
			   return this.listings.push(listing);
			   
		   });
		   
	   }
	   
   }
   
 }
interface Listing{
	
	$key?: string;
	title?: string;
	//type?: string;
	image?: string;
	city?: string;
	//owner?: string;
	//bedrooms?: string;
     review?: string;
}
interface Group{
	$key?:string;
	name?:string;
	admin?:string;
	Description?:string;
	members?:string;
}