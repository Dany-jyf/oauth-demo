import React from 'react';
import { Query } from 'urql';
import { getTodos } from '../../api/api';

interface op {
    fetching?:any;
    data?: any;
    error?: any;
    extensions?:any;
}

interface s {
    id?:any;
    text?:any;
}

const childEl = (o:op):any => {
    if (o.fetching) {
        return 'Loading...';
    } else if (o.error) {
        return 'Oh no!';
    } else {
        return (
            <ul>
                {o.data.todos.map((p:s) => (
                    <li key={p.id}>{p.text}</li>
                ))}
            </ul>
        );
    }
}

const View = ({ limit = 10 }) => (
    <Query query={getTodos} variables={{ limit }}>
        {childEl}
    </Query>
  )

export default View;