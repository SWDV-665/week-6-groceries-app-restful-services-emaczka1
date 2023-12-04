import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { GroceryServiceProvider } from '../providers/groceries-service/groceries-service';



interface GroceryItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery"

  items: GroceryItem[] = [
    {
      name: "Milk",
      quantity: 2
    },
    {
      name: "Cheese",
      quantity: 3
    },
    {
      name: "Bread",
      quantity: 1
    },
    {
      name: "Banana",
      quantity: 5
    }
  ];
  alertController: any;
  socialSharing: any;

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceryServiceProvider) {}

  async removeItem(item: GroceryItem, index: any) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item -' + index + " ...",
      duration: 3000 
    });
    (await toast).present();

    this.items.splice(index, 1);
  }

  async shareItem(item: GroceryItem, index: any) {
    console.log("Sharing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item -' + index + " ...",
      duration: 3000 
    });
    (await toast).present();

    let message = "Grocery Item - Name : " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";
    
    Share.share({
      title: subject,
      text: message,
    }).then(() => {
      console.log("Shared Successfully!");
    }).catch((error: any) => {
      console.error("Error while sharing ", error);
    });
  }

  async editItem(item: GroceryItem, index: any) {
    console.log("Editing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item -' + index + " ...",
      duration: 3000 
    });
    (await toast).present();
    this.showEditItemPrompt(item, index);

  }

  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  async showAddItemPrompt() {
    const prompt = await this.alertCtrl.create({
      header: 'Add Item',
      message: 'Please enter item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
        },
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'Quantity',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Prompt canceled');
          },
        },
        {
          text: 'Save',
          handler: (item: any) => {
            console.log('Save clicked', item);
            this.items.push(item);
          },
        },
      ],
    });
  
    (await prompt).present();
  }

  async showEditItemPrompt(item: { name: any; quantity: any; }, index: any) {
    const prompt = await this.alertCtrl.create({
      header: 'Edit Item',
      message: 'Please edit item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'Quantity',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Prompt canceled');
          },
        },
        {
          text: 'Save',
          handler: (item: any) => {
            console.log('Save clicked', item);
            this.items[index] = item;
          },
        },
      ],
    });
  
    (await prompt).present();
  }
}
  