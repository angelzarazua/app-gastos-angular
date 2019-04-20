import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-list',
  templateUrl: './modal-edit-list.component.html',
  styleUrls: ['./modal-edit-list.component.scss']
})
export class ModalEditListComponent implements OnInit {
  listFormGroup: FormGroup
  id: string;
  status: string;
  enProceso:boolean;
  terminado:boolean;

  list: any = { id: 0, name: '', status:0}

  constructor(
    private dbService : DatabaseService,
    private modal: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private alert: AlertController
  ) {
    this.enProceso=true;
    this.terminado=false;
    this.list.id = this.navParams.get('id');
    this.list.name = navParams.get('name');
    /* this.list.name = navParams.get('status'); */
    console.log('dentro de edit' + this.list.name + '   ' );
   }

  ngOnInit() {
    this.listFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      terminado: [false],
      enProceso: [true]
    });
  }

  async editList(list) {
   /* if(this.listFormGroup.value.enProceso==true && this.listFormGroup.value.terminado==true){
      console.log('Error, solo debe seleccionar una opcion');
      const alert = await this.alert.create({
        header: 'Alert',
        subHeader: 'Error',
        message: 'solo debe seleccionar una opcion.',
        buttons: ['OK']
      });
      await alert.present();
    }
    if(this.listFormGroup.value.enProceso==true){
      this.list.status=0;
    }
    else{
      this.list.status=1;
    }*/
    this.dbService.updateList(list).then(response => {
      console.log(response);
      this.modal.dismiss();
    }).catch(e => {
      console.log(e);
    })
  }

}
