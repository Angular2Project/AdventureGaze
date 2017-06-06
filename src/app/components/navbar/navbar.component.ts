import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  name;
  constructor(public af : AngularFire,
    public flashMessage:FlashMessagesService,
	public router : Router) { }
  
  getName() {
		var user = firebase.auth().currentUser;
		var name;
		if(user != null){
			name = user.displayName;
		}
		return name;
	}
  ngOnInit() {
  }
  
 
   login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
	this.router.navigate(['']);
	this.flashMessage.show('You are logged out',
	{cssClass : 'alert-success',timeout:3000});
	
	
  }
}