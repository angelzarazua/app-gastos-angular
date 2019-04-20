import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  formLogin: FormGroup;
  exprRegEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //@ViewChild('email') email;
  //@ViewChild('password') password;
  email: string;
  password: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router/*,
    private router: Router,
    private alert: AlertController*/
  ) { }

  ngOnInit() {
    this.formLogin=this.formBuilder.group({
      'password':['', Validators.required],
      'email' : ['', Validators.compose([Validators.required, Validators.pattern(this.exprRegEmail)])]
    });
  }




    login(){
      if (this.formLogin.value['email']=='hola@live.com.mx' && this.formLogin.value['password']=='1234') {
        console.log("BIEEEEEEEN!")
        this.router.navigateByUrl('tabs/tab1')
      }else{
        console.log("MAAAAAAL!");
      }
    }
  /*login(){
    if(this.email === "hola@live.com.mx" && this.password === "1234"){
      console.log('BIEEEEEEN!');
     }else{
      console.log("MAAAAAAL!");
      let alert = this.alert.create({
       title: 'Datos incorrectos',
       subTitle: 'Los datos ingresados son incorrectos.',
       buttons: ['OK']
      });
      alert.present();
  }
  }*/

  goUrl():void{
    this.router.navigateByUrl('/tab1');
  }


}
