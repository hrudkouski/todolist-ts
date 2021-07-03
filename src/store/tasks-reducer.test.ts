import {
    addTaskAC,
    changeTaskStatusAC,
    changeTitleStatusAC,
    removeTasksAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TaskStateType} from '../AppWithRedux';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todoList-api";

let startState: TaskStateType;

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '',
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '',
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '',
            },
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '',
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '',
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '',
            },
        ],
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTasksAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '',
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '',
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '',
            },
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '',
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '',
                deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '',
            },
        ],
    });

});
test('correct task should be added to correct array', () => {
    const action = addTaskAC("coffee", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("coffee");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});
test('title of specified task should be changed', () => {
    const action = changeTitleStatusAC("2", "water", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][0].title).toBe('bread');
    expect(endState["todolistId2"][1].title).toBe('water');
    expect(endState["todolistId2"][2].title).toBe('tea');
    expect(endState["todolistId1"][0].title).toBe('CSS');
    expect(endState["todolistId1"][1].title).toBe('JS');
    expect(endState["todolistId1"][2].title).toBe('React');
});
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
    expect(endState["todolistId2"]).toBeUndefined();
});
test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: 'todoListID_1', title: 'title 1', addedDate: '', order: 0},
        {id: 'todoListID_2', title: 'title 2', addedDate: '', order: 0},
    ]);

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["todoListID_1"]).toStrictEqual([]);
    expect(endState["todoListID_2"]).toStrictEqual([]);
});
test('tasks should be added for todolist', () => {
    const action = setTasksAC(startState['todolistId1'], 'todolistId1');

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': [],
    }, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});



