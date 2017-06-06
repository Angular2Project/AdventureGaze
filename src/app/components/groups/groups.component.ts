import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import {Router} from '@angular/router';
import * as firebase from 'firebase';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  description;
  members ;
  admin ;
  name ;
  show ;
  mem;
  groups:any;
   
	constructor(private firebaseService : FirebaseService,
               private router : Router) { 
		this.show = false;
	}
	ngOnInit() {
		this.firebaseService.getGroups().subscribe(groups =>{
		  //console.log("listings");
		  this.groups = groups;
	  });
	  		
	}
	
	createGroup(){
		this.show = true;
	}
	checkMember(){
		var user = firebase.auth().currentUser;
		var email;
		if(user != null){
			email = user.email;
		}
		this.mem = email;
	}
	JoinGroup(id){
		var user = firebase.auth().currentUser;
		var email;
		var sign = "$";
		if(user != null){
			email = user.email;
		}
		email = sign.concat(email);
		let group = { 
			description : id.description,
			admin : id.admin,
			name  : id.name,
			members : id.members.concat(email)
		}
		this.firebaseService.updateGroup(id.$key,group);
	}

	
	onAddSubmit(){
		
		var user = firebase.auth().currentUser;
		if (user != null) {
			this.admin = user.email;
			this.members = user.email;
		}
		this.show = false;
		let group = { 
			description : this.description,
			admin : this.admin,
			name  : this.name,
			members : this.members
		}
		this.firebaseService.addGroup(group);
		this.show = false;
	}
	
}