import React from 'react';
import { Provider, createClient } from 'urql';
import View from '../view/View';
// import axios from "axios"

const client = createClient({
  url: 'https://api.github.com/graphql',//?access_token=' + localStorage.getItem('access_token')
  fetchOptions: {
    headers: {
      accept: 'application/json',
      Authorization: 'token ' + localStorage.getItem('access_token')||''
    }
  }
});

class MyClient extends React.Component {
    render() {
        return (
            <Provider value={client}>
                <View></View>
            </Provider>
        )
    }
}

export default MyClient;