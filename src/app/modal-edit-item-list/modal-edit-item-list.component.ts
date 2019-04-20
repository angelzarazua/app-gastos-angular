import { Component, OnInit } from '@angular/core';

import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-modal-edit-item-list',
  templateUrl: './modal-edit-item-list.component.html',
  styleUrls: ['./modal-edit-item-list.component.scss']
})
export class ModalEditItemListComponent implements OnInit {
  listItemFormGroup: FormGroup;
  form: any;
  idList: string;
  idItem: string;
  image: string;
  listItem: any = { id: 0, name: '', descriptio: '',price:0,id_list:0, image:'' }

  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: true
  }

  constructor(
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private dbService: DatabaseService,
    private modal: ModalController,
    private camera: Camera
  ) {
    this.listItem= this.navParams.get('listItem');
 /*    this.listItem.id_list= this.navParams.get('idList');
    this.listItem.name = this.navParams.get('name');
    this.listItem.description = this.navParams.get('description');
    this.listItem.price = this.navParams.get('price');
    this.listItem.image = this.navParams.get('image'); */
    console.log('editar items' + this.listItem.name + '   ' +this.listItem.description + '   '+this.listItem.list_id +' '+this.listItem.id);
    console.log('URL IMAGEN: ', this.listItem.image)
  }

  ngOnInit() {
    this.listItemFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      image: [''],
    });
  }

  takePhoto(){
    this.camera.getPicture(this.options).then(imageData=>{
      this.listItem.image = 'data:image/jpeg;base64,' + imageData;
      console.log('ruta foto: ',this.listItem.image)
    },(err) => {
      console.log(err)
     })
  }

  editItemsList() {
    let form = this.listItemFormGroup.value
    this.listItem.name = form.name
    this.listItem.description = form.description
    this.listItem.price = form.price
    console.log('Toda la Información'+this.listItem.name+this.listItem.description+this.listItem.id)
    this.dbService.updateItemList(this.listItem).then(response => {
      console.log('editItem: ', response);
      this.modal.dismiss();
    }).catch(e => {
      console.log(e);
    })
  }

}
