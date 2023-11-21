import { Component } from "@angular/core";
import { RecipeService } from "../../recipes/recipe.service";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private rService: RecipeService,
                private slService: ShoppingListService,
                private authService: AuthService){}
    saveData() {
        this.rService.saveRecipesData().subscribe()
        this.slService.saveShoppingListData().subscribe()
    }

    fetchData() {
        this.rService.fetchRecipesData()
        this.slService.fetchShoppingListData()
    }

    isAuthenticated(){
        return this.authService.isAuthenticated()
    }

    onLogout(){
        this.authService.logout()
    }
}