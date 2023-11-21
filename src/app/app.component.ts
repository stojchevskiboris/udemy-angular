import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { initializeApp } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private rService: RecipeService,
              private slService: ShoppingListService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyB9HBc-3eer9rINWMb1pUKRYQGmIT-yTW4",
      authDomain: 'udemy-ng-http-e83c2.firebaseapp.com'
    };
    
    const app = initializeApp(firebaseConfig);
    try{
      this.rService.fetchRecipesData()
      this.slService.fetchShoppingListData()
    } catch{}
    

  }
}
