import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles, List, ListItem, ListItemText, Table, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Avatar, Typography, ListItemAvatar, LinearProgress } from '@material-ui/core';
import { createContainer, useContainer } from 'unstated-next';
import Axios from 'axios';
import classes from '*.module.sass';
import { setCache, getCache } from '../../util/util';


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

const ReposSingle = (props: {macth:any}) => {
    const list = getCache('repos')?JSON.stringify(getCache('repos')):[];
    const i = props.macth.params.index;
    const data = list[parseInt(i)];
    return (
        <MTable data={data}></MTable>
    )
}

export default ReposSingle;