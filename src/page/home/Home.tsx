import React from 'react';
import { Button } from '@material-ui/core';
import Axios from 'axios';

class Home extends React.Component {

    componentWillMount() {
       Axios.get("https://api.github.com/user", {
           headers: {
               "Authorization": `token ${localStorage.getItem('access_token')}`
           }
       }) 
    }

    render() {
        const url = 'https://github.com/login/oauth/authorize?client_id=c7f5f5ad65cc93ba7fa8&redirect_uri=http://localhost:3000/redirect';
        return (
            <React.Fragment>
                 <Button href={url}>login with GitHub</Button>
            </React.Fragment>
        )
    }
}

export default Home;