import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, TextField, Button, Paper, Toolbar, Typography } from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles((theme: Theme) => createStyles({
    login: {
        position: 'relative',
        top: '21%',
        background: '#fff',
        margin: '20% auto',
        width: theme.spacing(32),
        height: theme.spacing(38)
    },
    form: {
        textAlign: 'center',
        margin: '10px auto',
        // padding: '50px 0 0',
    },
    mybtn: {
        margin: '10px auto',
        textAlign: 'center'
    }
}))

// const updateRepos = (initState = "") => {
//     let [name, setName] = useState(initState);
//     let update = (n: string) => { setName(n) }
//     return { update, name };
// }

const searchByName = (name:string) => {
    Axios.get("https://api.github.com/users/" + name, {
        headers: {
            "Authorization": `token ${localStorage.getItem('access_token')}`
        }
    }).then(response => {
        if (response && response.data) {
            //setList(response.data);
        } else {
            //window.location.href = '/';
        }
        return response;
    }).catch(err => {
        //window.location.href = '/';
        console.log(err);
    })
}


const SearchForm = () => {
    const classes = useStyles();

    const [name, setName] = useState("");

    const handleChange = (e: any) => {
        setName(e.target.value);
    }

    const handleSearch = (name: string) => {
        window.location.href = window.location.origin + '/client/' + name;
        //searchByName(name);
    }

    return (
        <Paper className={classes.login}>
            <Toolbar><Typography>search</Typography></Toolbar>
            <form className={classes.form}>
                <div>
                    <TextField required id="standard-required" label="name" defaultValue="" onChange={handleChange} />
                    {/* <TextField required id="standard-required" label="name" defaultValue="" /> */}
                    <div className={classes.mybtn}>
                        <Button className={classes.mybtn} variant="contained" color="secondary" onClick={() => { handleSearch(name) }}>search</Button>
                    </div>
                </div>
            </form>
        </Paper>
    )
}

const Search = () => {
    return (
        <SearchForm></SearchForm>
    )
}

export default Search;