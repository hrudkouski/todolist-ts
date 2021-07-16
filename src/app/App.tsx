import React from 'react';
import './App.css';
import {Menu} from "@material-ui/icons";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container/Container';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import AppBar from '@material-ui/core/AppBar/AppBar';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import Error404 from "../features/Error404/Error404";

type AppPropsType = {
    demo?: boolean
}

const App: React.FC<AppPropsType> = ({demo = false}) => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <ErrorSnackbar/>
            <Container fixed>
                <Switch>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/404'} render={() => <Error404/>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    )
}

export default App;
