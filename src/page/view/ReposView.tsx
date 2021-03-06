import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles, List, ListItem, ListItemText, Table, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Avatar, Typography, ListItemAvatar, LinearProgress } from '@material-ui/core';
import { createContainer, useContainer } from 'unstated-next';
import Axios from 'axios';
import classes from '*.module.sass';
import { setCache } from '../../util/util';


const useStyles = makeStyles((theme: Theme) => createStyles({
    list: {
        color: "#ffffff"
    },
    inline: {
        display: 'inline',
    },
    center: {
        textAlign: 'center'
    },
    col1: {
        width: "20%"
    },
    col2: {
        width: "60%"
    },
    col3: {
        width: "20%"
    }
}));


// function updateRepos(initState = []) {
//     let [list, setList] = useState(initState);
//     let update = (l: []) => { setList(l) }
//     return { update, list };
// }

// const StateManager = createContainer(updateRepos);

// function getRepos(url: string, callback?: Function) {
//     Axios.get(url, {
//         headers: {
//             "Authorization": `token ${localStorage.getItem('access_token')}`
//         }
//     }).then(response => {
//         response && callback && callback(response);
//         return response;
//     }).catch(err => {
//         console.log(err);
//     })
// }


const MTable = (data: { [key: string]: any }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>key</TableCell>
                        <TableCell>value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(data).map(key => {
                            return (
                                <TableRow>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{typeof data[key] === 'string' ? data[key] : '[object object]'}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const Owner = (repos: any) => {
    const classes = useStyles();

    const owner = repos.owner || {};
    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={owner.login} src={owner.avatar_url} />
                </ListItemAvatar>
                <ListItemText
                    primary={owner.login}
                    secondary={
                        <React.Fragment>
                            {owner.html_url}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </React.Fragment>
    )
}

const ReposView = (props: { url: string, user:any }) => {
    const classes = useStyles();

    const [list, setList] = useState([]);

    const [loading, setLoading] = useState(1);

    useEffect(() => {
        Axios.get(props.url, {
            headers: {
                "Authorization": `token ${localStorage.getItem('access_token')}`
            }
        }).then(response => {
            if (response && response.data) {
                setList(response.data);
                setCache(props.user.login, response.data);
            } else {
                //window.location.href = '/';
            }
            setLoading(0);
            return response;
        }).catch(err => {
            if (err && err.response && err.response.data && err.response.data.message) {
                setTimeout(()=>{
                    window.history.back();
                }, 1000);
            }
            //window.location.href = '/';
            console.log(err);
        })
    }, []);

    const onItemClick = (index: any) => {
        window.location.href = window.location.origin + '/view/' + index;
    }

    return (
        <div>
            {loading?(<div className={classes.center}><LinearProgress /></div>):(props.user?<List component="nav" aria-label="secondary mailbox folders" className={classes.list}>
                <Owner owner={props.user}></Owner>
                <ListItem button alignItems="flex-start">
                    <ListItemText primary="name" className={classes.col1}/>
                    <ListItemText primary="url"  className={classes.col2}/>
                    <ListItemText primary="watchers"  className={classes.col3}/>
                </ListItem>
                {
                    list.length?list.map((item: { id: any, name?: string, html_url?: string, watchers?:number }, index) => (
                        <ListItem button alignItems="flex-start" onClick={(e) => { onItemClick(index) }} key={index}>
                            <ListItemText primary={item.name}  className={classes.col1}/>
                            <ListItemText primary={item.html_url} className={classes.col2}/>
                            <ListItemText primary={item.watchers} className={classes.col3}/>
                        </ListItem>
                    )):(<div className={classes.center}>Sorry,Not Found!</div>)
                }
            </List>:<div className={classes.center}>Sorry,Not Found!</div>)}
        </div>
    )
}

export default ReposView;