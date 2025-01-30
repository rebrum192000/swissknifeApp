import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

interface WishlistItem {
  name: string;
  price: number;
  url: string;
  image: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule, HeaderComponent],
})
export class WishlistComponent implements OnInit {
  items: WishlistItem[] = [];
  newItem: string = '';
  newPrice: number = 0;
  newUrl: string = '';
  newImage: File | null = null;
  itemEdit: any = [];
  sortOrder: 'asc' | 'desc' = 'asc';

  ngOnInit() {
    this.loadWishlistFromLocalStorage();
  }

  addItem() {
    if (this.newItem && this.newPrice !== null && this.newUrl && this.newImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const newItem: WishlistItem = {
          name: this.newItem,
          price: this.newPrice,
          url: this.newUrl,
          image: reader.result as string,
          isEditing: false,
        };
        this.items.push(newItem);
        this.itemEdit.push({ name: this.newItem, price: this.newPrice, url: this.newUrl, image: reader.result });
        this.resetNewItemFields();
        this.saveWishlistToLocalStorage();
      };
      reader.readAsDataURL(this.newImage);
    }
  }

  editItem(index: number) {
    this.items[index].isEditing = true;
    this.itemEdit[index] = { ...this.items[index] };
  }

  saveItem(index: number) {
    this.items[index] = { ...this.itemEdit[index], isEditing: false };
    this.saveWishlistToLocalStorage();
  }

  cancelEdit(index: number) {
    this.items[index].isEditing = false;
    this.itemEdit[index] = { ...this.items[index] };
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.itemEdit.splice(index, 1);
    this.saveWishlistToLocalStorage();
  }

  saveWishlistToLocalStorage() {
    const wishlistData = JSON.stringify(this.items);
    localStorage.setItem('wishlist', wishlistData);
  }

  loadWishlistFromLocalStorage() {
    const wishlistData = localStorage.getItem('wishlist');
    if (wishlistData) {
      this.items = JSON.parse(wishlistData);
    }
  }

  sortItems(order: 'asc' | 'desc') {
    this.sortOrder = order;
    this.items.sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price));
  }

  private resetNewItemFields() {
    this.newItem = '';
    this.newPrice = 0;
    this.newUrl = '';
    this.newImage = null;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.newImage = input.files[0];
    }
  }
}
