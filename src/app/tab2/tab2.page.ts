import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  photo:string = 'assets/Saturno.jpg'

  options : CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: true
  }
  constructor(
    private camera : Camera
  ){}

  takePhoto(){
    console.log('Tomar foto')
    this.camera.getPicture(this.options).then(imageData =>{
      console.log('ImageData')
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }).catch(error=>{
      console.log(error)
    })
  }
}
