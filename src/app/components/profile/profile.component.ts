import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	groups;
	mem;
	constructor(private firebaseService : FirebaseService,
               ) { }
	ngOnInit() {
		this.firebaseService.getGroups().subscribe(groups =>{
			this.groups = groups;
		});
	}
	
	checkMember(){
		var user = firebase.auth().currentUser;
		var email;
		if(user != null){
			email = user.email;
		}
		this.mem = email;
	}
}
