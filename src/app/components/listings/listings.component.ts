import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FilterPipe } from '../../filter.pipe';
import { UniquePipe } from '../../unique.pipe';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  listings :any;
  constructor(private firebaseService : FirebaseService) { }

  ngOnInit() {
	  this.firebaseService.getListings().subscribe(listings =>{
		  //console.log("listings");
		  this.listings = listings;
	  });
	var user = firebase.auth().currentUser;
	var name, email,uid;
	if (user != null) {
		name = user.displayName;
		email = user.email;
		uid = user.uid;
		console.log(name+email+uid);
	}
	  
  }
;
}