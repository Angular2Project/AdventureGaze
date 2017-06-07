import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FilterPipe } from '../../filter.pipe';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
	message : any;
	id : any;
	messages;
	show = 0;
	groups;
	splitted : any;
	constructor( private firebaseService : FirebaseService,
               private router : Router,
			   private route : ActivatedRoute) { }
	ngOnInit() {
		this.id  = this.route.snapshot.params['id'];
		this.firebaseService.getMessage(this.id).subscribe(messages =>{
		  this.messages = messages;
	  });
	  this.firebaseService.getGroups().subscribe(groups =>{
		  //console.log("listings");
		  this.groups = groups;
	  });
	}
	showMembers(){
		this.id  = this.route.snapshot.params['id'];
	}
	
	printMembers(members){
		this.splitted = members.split("$"); 
		
		
	}
    onAddSubmit(){
		this.id  = this.route.snapshot.params['id'];
		var email = this.firebaseService.getUsername();
		let message = { 
			name: email,
			message : this.message,
		}
		this.firebaseService.addMessage(message,this.id);
		this.message = "";
	}


}
