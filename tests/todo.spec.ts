import {test, expect} from '@playwright/test';
import { TodoPage } from './pages/todo.page';

test.describe('To Do App tests', () => {
    let todoPage: TodoPage;     
    test.beforeEach(async ({page}) => {
        todoPage = new TodoPage(page);
        await todoPage.goto('/todomvc/#/')
    })

    test.describe('Adding todos', () => {
    test('Add a single todo', async () => {
        await todoPage.createToDo(['Item1']);
        await expect(todoPage.todoItems.first()).toBeVisible();
    })
    
    test('Add multiple todos', async () => {
        await todoPage.createToDo(['Item1', 'Item2', 'Item3']);
        await expect(todoPage.todoItems).toHaveCount(3);
        await expect(todoPage.todoItems.first()).toHaveText('Item1')
        await expect(todoPage.todoItems.nth(1)).toHaveText('Item2')
        await expect(todoPage.todoItems.nth(2)).toHaveText('Item3')
    })
    })
    
    test.describe('Removing todos', () => {
        test.beforeEach(async () =>{
        await todoPage.createToDo(['Item1', 'Item2', 'Item3']);
        })

    test('Remove a single todo', async () => {
        await todoPage.deleteToDo(0);
        await expect(todoPage.todoItems).toHaveCount(2);
         await expect(todoPage.todoItems.nth(0)).toHaveText('Item2')
        await expect(todoPage.todoItems.nth(1)).toHaveText('Item3')
    })
    
    test('Remove multiple todos', async () => {
        await todoPage.deleteToDo(0);
        await expect(todoPage.todoItems).toHaveCount(2);
         await expect(todoPage.todoItems.nth(0)).toHaveText('Item2')
        await expect(todoPage.todoItems.nth(1)).toHaveText('Item3')

         await todoPage.deleteToDo(1);
        await expect(todoPage.todoItems).toHaveCount(1);
         await expect(todoPage.todoItems.nth(0)).toHaveText('Item2')

          await todoPage.deleteToDo(0);
        await expect(todoPage.todoItems).toHaveCount(0);
    })
    })

    test.describe('Complete todos', () => {
        test.beforeEach(async () =>{
        //Create todos
        await todoPage.createToDo(['Item1', 'Item2', 'Item3']);
        })

    test('Complete a single todo', async () => {
        await todoPage.completeToDo(0);
        await expect(todoPage.todoItems).toHaveCount(3);

        //TODO: /completed/ would check if it contains the class
         await expect(todoPage.todoItems.nth(0)).toHaveClass('completed')
         await expect(todoPage.todoItems.nth(1)).not.toHaveClass('completed')
         await expect(todoPage.todoItems.nth(2)).not.toHaveClass('completed')
    })
    
    test('Complete multiple todos', async () => {
        await todoPage.completeToDo(0);
        await expect(todoPage.todoItems).toHaveCount(3);
         await expect(todoPage.todoItems.nth(0)).toHaveClass('completed')
         await expect(todoPage.todoItems.nth(1)).not.toHaveClass('completed')
         await expect(todoPage.todoItems.nth(2)).not.toHaveClass('completed')

             await todoPage.completeToDo(1);
        await expect(todoPage.todoItems).toHaveCount(3);
         await expect(todoPage.todoItems.nth(0)).toHaveClass('completed')
         await expect(todoPage.todoItems.nth(1)).toHaveClass('completed')
         await expect(todoPage.todoItems.nth(2)).not.toHaveClass('completed')

             await todoPage.completeToDo(2);
        await expect(todoPage.todoItems).toHaveCount(3);
         await expect(todoPage.todoItems.nth(0)).toHaveClass('completed')
         await expect(todoPage.todoItems.nth(1)).toHaveClass('completed')
         await expect(todoPage.todoItems.nth(2)).toHaveClass('completed')
    })
    })

    test.describe('Filtering', () => {
        test.beforeEach(async () =>{
        await todoPage.createToDo(['Item1', 'Item2', 'Item3']);
        await todoPage.completeToDo(0);
        })

        test('Filters - All (Default)', async () => {
            await expect(todoPage.filtersAll).toHaveClass('selected');
            await expect(todoPage.filtersActive).not.toHaveClass('selected');
            await expect(todoPage.filtersCompleted).not.toHaveClass('selected');
                    await expect(todoPage.todoItems).toHaveCount(3);
        })
      
        test('Filters - Active', async ({page}) => {
            await todoPage.filterBy('Active');
            await expect(page).toHaveURL(/active/)

             //Filters checks
            await expect(todoPage.todoItems.nth(0)).toHaveText('Item2');
            await expect(todoPage.filtersAll).not.toHaveClass('selected');
            await expect(todoPage.filtersActive).toHaveClass('selected');
            await expect(todoPage.filtersCompleted).not.toHaveClass('selected');

            //Todo items checks
            await expect(todoPage.todoItems).toHaveCount(2);
            await expect(todoPage.todoItems.nth(0)).not.toHaveClass('completed')
            await expect(todoPage.todoItems.nth(1)).not.toHaveClass('completed')
        })

        test('Filters - Completed', async ({page}) => {
            await todoPage.filterBy('Completed');
            await expect(page).toHaveURL(/completed/)

             //Filters checks
            await expect(todoPage.todoItems.nth(0)).toHaveText('Item1');
            await expect(todoPage.filtersAll).not.toHaveClass('selected');
            await expect(todoPage.filtersActive).not.toHaveClass('selected');
            await expect(todoPage.filtersCompleted).toHaveClass('selected');

            //Todo items checks
            await expect(todoPage.todoItems).toHaveCount(1);
            await expect(todoPage.todoItems.nth(0)).toHaveClass('completed')
        })
    })


})