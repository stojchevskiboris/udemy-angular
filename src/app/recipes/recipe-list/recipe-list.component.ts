import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {

  recipes!: Recipe[];
  allRecipes!: Recipe[];
  subscription: Subscription;
  searchMode = false
  loadingTimeout = false
  secondInput: string = ''
  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.recipes = this.performFilter(value);
  }
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
        this.allRecipes = recipes
      }
    )
    this.recipes = this.recipeService.getRecipes();
    this.allRecipes = this.recipeService.getRecipes();

    setTimeout(() => {
      this.loadingTimeout = true
    }, 5000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  performFilter(filterBy: string): Recipe[] {
    if (filterBy != '') {
      this.searchMode = true
      filterBy = filterBy.toLocaleLowerCase();
      return this.allRecipes.filter((r: Recipe) =>
        r.name.toLocaleLowerCase().includes(filterBy))
    } else {
      this.searchMode = false
      this.recipes = this.recipeService.getRecipes()
    }
    return this.recipes
  }

  clearFilter() {
    this._listFilter = '';
    this.recipes = this.performFilter('');
    this.secondInput = ''
  }

  getIndex(recipeEl: Recipe) {
    let recipesCopy = this.recipeService.getRecipes()
    let index = 0
    for (let i of recipesCopy) {
      if (i.name == recipeEl.name && i.description == recipeEl.description) {
        return index // successful find of indexes
      }
      index++;
    }
    return -1 // unsuccessful
  }

  onInputChange(inputEvent) {
    if (inputEvent != '') { // main input has some text to filter from
      let recipeNames: string[] = this.recipeService.getRecipes()
        .map(r => r.name.toLocaleLowerCase())
        .filter(r => r.includes(inputEvent.toLocaleLowerCase()))
      if (recipeNames.length > 0 &&
        inputEvent.toLocaleLowerCase() == recipeNames[0].slice(0, inputEvent.length)) {
        recipeNames[0] = inputEvent + recipeNames[0].slice(inputEvent.length)
        this.secondInput = recipeNames[0]
      } else {
        this.secondInput = ''
      }
    } else {
      this.secondInput = ''
    }
  }
}
