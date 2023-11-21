import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  constructor(private slService:ShoppingListService){}

  ingredients: Ingredient[] = [
    
  ];
  subscription?:Subscription

  ngOnInit(){
    if(this.slService.getIngredients().length==0){
      this.slService.fetchShoppingListData()  
    }
    this.ingredients = this.slService.getIngredients()
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  onEditItem(index:number){
    this.slService.startedEditing.next(index);
  }

}
