import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./todolists-reducer";
import {FilterValuesType, TodoListType} from "../AppWithRedux";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe("What to buy");
    expect(endState[0].filter).toBe('all');
});
test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("What to buy");
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
    expect(endState[2].id).not.toBe(todolistId1)
    expect(endState[2].id).not.toBe(todolistId2)

});
test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(startState[0].title).toBe("What to learn");
    expect(startState[1].title).toBe("What to buy");
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodoListFilterAC(todolistId2, newFilter);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
    expect(startState[0].filter).toBe("all");
    expect(startState[1].filter).toBe("all");
});