import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ModalItemComponent } from '../modal-item/modal-item.component';
import { DatabaseService } from '../database.service';
import { ModalEditItemListComponent } from '../modal-edit-item-list/modal-edit-item-list.component';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  listItem: any
  idList: string
  status: boolean = false
  constructor(
    private route : ActivatedRoute,
    private modal : ModalController,
    private dbService : DatabaseService,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.idList = this.route.snapshot.paramMap.get('id');
    console.log('ID details: ', this.idList)

    this.dbService.selectList(this.idList).then(response => {
      if (response.rows.item(0).status == 1) {
        this.status = true
      }
      console.log('status: ', this.status)
    }).catch(e => { console.log(e) })

    this.dbService.getAllItemList(this.idList).then(response => {
      console.log(response)
      this.listItem = response;
    }).catch(e => {
      console.log(e)
    });
  }

  imp(){
    console.log('FuncioNaaaa!! :D')
  }

  /*async openModal(){
    const modal = await this.modal.create({
      component : ModalItemComponent,
      cssClass:'modal',
      componentProps:{
        id: this.idList
      }
    });
    return await modal.present();
  }*/

  async openModalCreateItemList() {
    const modal = await this.modal.create({
      component: ModalItemComponent,
      componentProps: {
        id: this.idList
      }
    });
    modal.onDidDismiss().then(() => this.ngOnInit());
    return await modal.present();
  }

  async openModalEditItemList(listItem) {
    const modal = await this.modal.create({
      component: ModalEditItemListComponent,
      cssClass: 'modal',
      componentProps: {
        listItem: listItem
      },
    });
    modal.onDidDismiss().then(() => this.ngOnInit());
    return await modal.present();
  }


  async  hojaDeAcciones(listItem) {
    const actionSheet = await this.actionSheetController.create({
      header: '         opciones',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.dbService.deleteItemList(this.idList,listItem.id);
          this.ngOnInit();
          console.log('Delete clicked');
        }
      }, {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.openModalEditItemList(listItem);
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
