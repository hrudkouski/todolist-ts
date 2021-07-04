import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodoListDomainType,
    todoListsReducer
} from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0
        },
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
    const endState = todoListsReducer(startState, addTodolistAC(
        {
            id: 'todoListID_1',
            title: 'new todolist',
            addedDate: '',
            order: 0
        }
    ))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("new todolist");
    expect(endState[1].title).toBe("What to learn");
    expect(endState[2].title).toBe('What to buy');
    expect(endState[0].id).not.toBe(todolistId1)
    expect(endState[0].id).not.toBe(todolistId2)

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

test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState);

    const endState = todoListsReducer([], action);

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('What to learn');
});