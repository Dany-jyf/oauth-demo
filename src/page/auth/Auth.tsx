import React from 'react';
import { useHistory, Redirect } from 'react-router';
import { convertParams } from '../../util/util';
const axios = require('axios');
const qs = require('qs');

const Auth = () => {
    const his = useHistory();
    if (his.location.search) {
        let s = his.location.search.split('=')[1];
        if(s) {
            axios.post('/login/oauth/access_token', qs.stringify({
                    client_id: 'your client_id', 
                    client_secret: 'your client_secret', 
                    code: s
            })).then((response:any)=>{
                console.log(response);
                if (response && response.data) {
                    const res = response.data;
                    //access_token=703e3fd9619dac77f96ef6e691c082b2efba65da&scope=&token_type=bearer
                    //error=bad_verification_code&error_description=The+code+passed+is+incorrect+or+expired.&error_uri=https%3A%2F%2Fdeveloper.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-oauth-app-access-token-request-errors%2F%23bad-verification-code
                    if (res.indexOf('error') === -1) {
                        let p = convertParams(res);
                        p.access_token && localStorage.setItem('access_token',  p.access_token)
                        window.location.href = window.location.origin + '/search';
                    } else {
                        window.location.href = '/';
                    }
                }
                return response;
            }).catch((json:any)=> {
                console.log('catch:', json);
            });
        }
    }

    return (<div className="loading"></div>)
}

export default Auth;