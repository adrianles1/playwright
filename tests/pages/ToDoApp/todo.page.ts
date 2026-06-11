import { Page, Locator, expect } from "@playwright/test";

export class TodoPage{
    //Declare the selectors
    readonly page: Page;
    readonly input: Locator;
    readonly todoItems: Locator;
    readonly itemsLeftCount: Locator;
    readonly filtersAll: Locator;
    readonly filtersActive: Locator;
    readonly filtersCompleted: Locator;
    readonly clearCompleted: Locator;

    //Initialise the selectors
    constructor(page: Page){
        this.page = page;
        this.input = page.getByPlaceholder('What needs to be done?');
        this.todoItems = page.getByTestId('todo-item');
        this.itemsLeftCount = page.getByTestId('todo-count');
        this.clearCompleted = page.getByRole('button', {name: "Clear completed", exact: true})

        //Filters
        this.filtersAll = page.getByRole('link', {name: "All", exact: true})
        this.filtersActive = page.getByRole('link', {name: "Active", exact: true})
        this.filtersCompleted = page.getByRole('link', {name: "Completed", exact: true})
        
    }

    async goto(url: string){
        await this.page.goto(url)
    }

    async createToDo(names: string[]){
        for(const name of names){
        await this.input.fill(name);
        await this.input.press('Enter');
        }
    }

    async completeToDo(index: number){
        await this.todoItems.nth(index).hover();
        await this.todoItems.nth(index).getByLabel('Toggle Todo').click();
    }
    async deleteToDo(index: number){
        await this.todoItems.nth(index).hover();
        await this.todoItems.nth(index).getByLabel('Delete').click();
    }

    async filterBy(filter: 'All' | 'Active' | 'Completed'){
        await this.page.getByRole('link', {name: filter, exact: true}).click();
    }
}
