import { Component, DoCheck } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})

export class RecipeStartComponent implements DoCheck {
  recipesExist: boolean = false
  constructor(private recipesService: RecipeService) { }
  ngDoCheck(): void {
    if (this.recipesService.getRecipes().length > 0) {
      this.recipesExist = true
    }
  }
}
