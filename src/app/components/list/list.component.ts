import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  id : any;
  title:any;
  listing :any;
  imageUrl : any;
  
  constructor(
	private firebaseService : FirebaseService,
	private router : Router,
	private route : ActivatedRoute) { }

  ngOnInit() {
	this.id  = this.route.snapshot.params['id'];
	this.firebaseService.getListingDetails(this.id).subscribe(listing =>{
		  //console.log("listings");
		  this.listing = listing;	
		  let storageRef = firebase.storage().ref();
		  //let spaceRef = storageRef.child(listing.path);
		  storageRef.child(this.listing.path).getDownloadURL().then((url) => {
			    this.imageUrl = url;
		  }).catch( (error) => {
			  console.log(error);
		  });
				
		
	}); 
  }

}
