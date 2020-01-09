import React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history'
import Home from './page/home/Home';
import Auth from './page/auth/Auth';
import MyClient from './page/client/Client';
import View from './page/view/View';

class App extends React.Component {
    // toGitHub = ():void => {
    //     window.location.href = 'https://github.com/login/oauth/authorize?client_id=c7f5f5ad65cc93ba7fa8&redirect_uri=http://localhost:3000/redirect'
    // }
    render() {
        const browserHistory = createBrowserHistory();
        return (
            <React.Fragment>
               <Router history={browserHistory}>
                    <Route path='/view' component={View}></Route>
                    <Route path='/redirect' component={Auth}></Route>
                    <Route path='/client' component={MyClient}></Route>
                   <Route path='/' component={Home}></Route>
               </Router>
            </React.Fragment>
        )
    }
}

export default App;