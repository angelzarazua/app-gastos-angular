import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalListComponent } from './modal-list/modal-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {SQLite} from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './database.service';
import { Camera } from '@ionic-native/camera/ngx';
import { ModalEditListComponent } from './modal-edit-list/modal-edit-list.component';
import { ModalItemComponent } from './modal-item/modal-item.component';
import { ModalEditItemListComponent } from './modal-edit-item-list/modal-edit-item-list.component';
@NgModule({
  declarations: [AppComponent, ModalListComponent, ModalEditListComponent, ModalItemComponent, ModalEditItemListComponent],
  entryComponents: [ModalListComponent, ModalEditListComponent, ModalItemComponent, ModalEditItemListComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    DatabaseService,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
