// import {
//     AddTodoListAC, ChangeFilterTypeAC,
//     ChangeTodoListTitleAC,
//     DeleteTodoListAC,
//     todoListsReducer
// } from './todolists-reducer';
// import {v1} from 'uuid';
// import {FilterValuesType, TodoListType} from "../App";
//
// test('correct todolist should be removed', () => {
//     let todoListId1 = v1();
//     let todoListId2 = v1();
//
//     const startState: Array<TodoListType> = [
//         {id: todoListId1, title: "What to learn", filter: "all"},
//         {id: todoListId2, title: "What to buy", filter: "all"}
//     ]
//
//     const endState = todoListsReducer(startState, DeleteTodoListAC(todoListId1))
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todoListId2);
// });
//
// test('correct todolist should be added', () => {
//     let todoListId1 = v1();
//     let todoListId2 = v1();
//
//     let newTodoListTitle = 'New TodoList'
//
//     const startState: Array<TodoListType> = [
//         {id: todoListId1, title: "What to learn", filter: "all"},
//         {id: todoListId2, title: "What to buy", filter: "all"}
//     ]
//
//     const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))
//
//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(newTodoListTitle);
// });
//
// test('correct todolist should change its name', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let newTodolistTitle = "New Todolist";
//
//     const startState: Array<TodoListType> = [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ]
//
//     // const action: ActionType = {
//     //     type: 'CHANGE-TODOLIST-TITLE',
//     //     todoListID: todolistId2,
//     //     newTitle: newTodolistTitle
//     // };
//
//     const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
//
// test('correct filter of todolist should be changed', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let newFilter: FilterValuesType = "completed";
//
//     const startState: Array<TodoListType> = [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ]
//
//     // const action: ActionType = {
//     //     type: 'CHANGE-FILTER',
//     //     todoListID: todolistId2,
//     //     value: newFilter
//     // };
//
//     const endState = todoListsReducer(startState, ChangeFilterTypeAC(todolistId2, newFilter));
//
//     expect(endState[0].filter).toBe("all");
//     expect(endState[1].filter).toBe(newFilter);
// });
//


import {v1} from 'uuid';
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./todolists-reducer";
import {FilterValuesType, TodoListType} from "../App";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe("What to buy");
    expect(endState[0].filter).toBe('all');
});
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("What to buy");
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
    expect(endState[2].id).not.toBe(todolistId1)
    expect(endState[2].id).not.toBe(todolistId2)

});
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(startState[0].title).toBe("What to learn");
    expect(startState[1].title).toBe("What to buy");
});
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = ChangeTodoListFilterAC(todolistId2, newFilter);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
    expect(startState[0].filter).toBe("all");
    expect(startState[1].filter).toBe("all");
});

