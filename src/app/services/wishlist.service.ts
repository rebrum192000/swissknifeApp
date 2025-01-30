import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

interface WishlistItem {
  name: string;
  price: number;
  url: string;
  isEditing: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    private items: WishlistItem[] = [];

    constructor() {}

    getItems(): WishlistItem[] {
        return this.items;
    }

    addItem(item: WishlistItem): void {
        this.items.push(item);
    }

    updateItem(index: number, newName: string): void {
        if (this.items[index]) {
            this.items[index].name = newName;
        }
    }

    removeItem(index: number): void {
        this.items.splice(index, 1);
    }
}
