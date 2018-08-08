import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
* Generated class for the HomePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
declare var firebase;

@IonicPage()
@Component({
 selector: 'page-home',
 templateUrl: 'home.html',
})
export class HomePage {

 name;
 shopingItem={
  name:''
 }
 keyname;

 items=[{
   name:'',
   keyname:''
 }];
 cont = "update";
 constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  
  this.cont = ''
  firebase.database().ref('/cuisine/').on("value",(snapshot) =>{
    this.items=[];
    snapshot.forEach((snap) =>{
      this.items.push({keyname : snap.key, name :snap.val().name});
      return false;

    })
  });
 }

 ionViewDidLoad() {
   this.updateData();
 }

 updateData(){
 

   
 }

 writecuisine(){

    this.items=[]
    this.shopingItem.name = this.name;
    console.log(this.name);
    var database = firebase.database();
    database.ref('/cuisine/').push(this.shopingItem);
   
  //  this.updateData();
  //  console.log(this.items);
   
 }

 
 delete(key){
   var database = firebase.database();
   database.ref('/cuisine/' + key).remove();
   //this.updateData();
 }

 update(selectedKey, selectedName){
  // this.keyname = selectedKey;
  // this.name = selectedName;
  // this.cont == "update";
  // this.writecuisine();
  let alert = this.alertCtrl.create({
    title: 'Are you sure you want to update?',
    inputs: [
      {
        name: 'updatedName',
        placeholder: ''
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Update',
        handler: data => {
          var database = firebase.database();
           database.ref('/cuisine/'+ selectedKey).set({name:data.updatedName});

        }
      }
    ]
  });
  alert.present();
   
 }

 

}