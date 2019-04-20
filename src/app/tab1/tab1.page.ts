import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { ModalListComponent } from '../modal-list/modal-list.component';
import { DatabaseService } from '../database.service';
import { ModalEditListComponent } from '../modal-edit-list/modal-edit-list.component';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  lists : any;
  txtStatus:string
  cssStatus:string;
  idDelete:any

  constructor(
    private dbService : DatabaseService,
    private modal: ModalController,
    //private alert: AlertController,
    private router: Router,
    private actionSheetController: ActionSheetController
    ){
  }
  goUrl():void{
    this.router.navigateByUrl('/login');
  }

  ngOnInit(){
    this.dbService.getAllList().then(response => {
      console.log(response);
      this.lists = response;
    }).catch(e => {
      console.log(e)
    });
  }

  getStatus(id){
    if (id == 0) {
      this.txtStatus = 'En proceso';
      this.cssStatus = 'enProceso';
    } else {
      this.txtStatus = 'Terminado';
      this.cssStatus = 'terminado';
    }
  }


  async openModal(){
    const modal = await this.modal.create({
      component : ModalListComponent,
      cssClass:'modal'
    });
    return await modal.present();
  }

  doRefresh(event){
    console.log('Begin async operation');
    this.ngOnInit();
    event.target.complete();
  }

  async openModalEditList(list){
    const modal = await this.modal.create({
      component: ModalEditListComponent,
      cssClass:'editList',
      componentProps:{
        list: list
      }
    });
    modal.onDidDismiss().then(() => this.ngOnInit());
    return await modal.present();
  }


  async  hojaDeAcciones(list) {
    if (list.status == 0) {
      const actionSheet = await this.actionSheetController.create({
        header: '      Opciones',
        buttons: [{
          text: 'Mas detalles',
          icon: 'eye',
          handler: () => {
            this.router.navigateByUrl('/list-details/' + list.id)
            /* this.navCtrl.navigateForward('/list-details/:list.id'); */
            console.log('Favorite clicked');
          }

        }, {
          text: 'Editar',
          icon: 'create',
          handler: () => {
            this.openModalEditList(list);
          }
        }, {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.dbService.deleteList(list.id);
            this.ngOnInit();
            console.log('Delete clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    } else {
      const actionSheet = await this.actionSheetController.create({
        header: '    Opciones de la lista',
        buttons: [{
          text: 'Mas detalles',
          icon: 'eye',
          handler: () => {
            this.router.navigateByUrl('/list-details/' + list.id)
            /* this.navCtrl.navigateForward('/list-details/:list.id'); */
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }
  }



}
