import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, makeStyles, createStyles, Theme } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import Axios from 'axios';
import { Router, Route, Switch } from 'react-router';
import MyClient from '../client/Client';
import Auth from '../auth/Auth';
import View from '../view/View';
import ReposSingle from '../view/ReposSingle';
import Login from '../login/Login';
import Search from '../search/Search';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: "center"
    },
}))

const Header = () => {
    const [authUser, setAuthUser] = useState({ login: 'welcome', avatar_url: '' });

    useEffect(() => {
        Axios.get("https://api.github.com/user", {
            headers: {
                "Authorization": `token ${localStorage.getItem('access_token')}`
            }
        }).then(response => {
            if (response && response.data) {
                setAuthUser(response.data);
                //window.location.href = window.location.origin + '/search';
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title}>{authUser.login}</Typography>
                    <Avatar sizes="0.5vh" src={authUser.avatar_url}></Avatar>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const Home = () => {
    const browserHistory = createBrowserHistory();
    return (
        <React.Fragment>
            <Header></Header>
            <Router history={browserHistory}>
                <Switch>
                    <Route path='/view/:index' component={ReposSingle}></Route>
                    <Route path='/auth' component={Auth}></Route>
                    <Route path='/client/:name' component={MyClient}></Route>
                    <Route path='/search' component={Search}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Login}></Route>
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default Home;