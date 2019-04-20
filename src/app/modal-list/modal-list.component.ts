import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators}from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.scss']
})
export class ModalListComponent implements OnInit {
  listFormGroup :FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private dbService : DatabaseService,
    private modal: ModalController,
    private router: Router
    ) {}


  ngOnInit() {
    this.listFormGroup = this.formBuilder.group({
      'name' : ['', Validators.required]
    });
  }

  crearLista():void{
    console.log(this.listFormGroup.value);
    this.dbService.createList(this.listFormGroup.get('name').value).then(Response=>{
      console.log(Response);
      this.modal.dismiss();
    }).catch(e => {
      console.log(e)
    })
  }

}
