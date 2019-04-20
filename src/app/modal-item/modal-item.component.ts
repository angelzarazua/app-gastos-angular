import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent implements OnInit {
  idList: string
  listItemFormGroup: FormGroup;
  image: string;

  options : CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: true
  }

  constructor(
    private formBuilder : FormBuilder,
    private dbService : DatabaseService,
    private modal : ModalController,
    private camera : Camera,
    private navParams: NavParams
  ) { }


  ngOnInit() {
    this.idList = this.navParams.get('id')
    this.listItemFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ''
    });
  }

  crearItemsList() {
    let data = this.listItemFormGroup.value
    console.log('fomr-create item: ', data)
    console.log('fomr-create photo: ', this.image)

    this.dbService.createItemList(this.idList, data.name, data.description, data.price, this.image).then(response => {
      console.log(response);
      this.modal.dismiss();
    }).catch(e => {
      console.log(e);
    })
  }

  takePhoto(){
    console.log('tomando foto')
    this.camera.getPicture(this.options).then(imageData=>{
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log('ruta foto: ',this.image)
    },(err) => {
      console.log(err)
     })
  }

}
