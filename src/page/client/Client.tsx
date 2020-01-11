import React, { useEffect, useState } from 'react';
import { Provider, createClient } from 'urql';
import ReposView from '../view/ReposView';
import Axios from 'axios';
import { makeStyles, Theme, createStyles, LinearProgress } from '@material-ui/core';
// import axios from "axios"

const client = createClient({
  url: 'https://api.github.com/graphql',//?access_token=' + localStorage.getItem('access_token')
  fetchOptions: {
    headers: {
      accept: 'application/json',
      Authorization: 'token ' + localStorage.getItem('access_token') || ''
    }
  }
});

const useStyle = makeStyles((theme: Theme) => createStyles({
  center: {
    textAlign: 'center'
  }
}))

const MyClient = (props: { match: any }) => {

  const [user, setUser] = useState(null);
  const [notfound, setNotFound] = useState(0);

  useEffect(() => {
    Axios.get("https://api.github.com/users/" + props.match.params.name, {
      headers: {
        "Authorization": `token ${localStorage.getItem('access_token')}`
      }
    }).then(response => {
      if (response && response.data) {
        setUser(response.data);
        //window.location.href = window.location.origin + '/search';
      }
    }).catch(err => {
      setNotFound(1);
      console.log(err);
    })
  }, []);

  const classes = useStyle();

  const url = "https://api.github.com/users/" + props.match.params.name + '/repos'
  return (
    <React.Fragment>
      {
        notfound?(<div className={classes.center}>Sorry,Not Found!</div>):(user ? <ReposView url={url} user={user}></ReposView> : <div><LinearProgress /></div>)
      }
    </React.Fragment>
  )
}

export default MyClient;