/**
 * 登陆框
 */
import React from 'react';
import Pager from '@material-ui/core/Paper';
import { makeStyles, Theme, createStyles, Tabs, Tab, Typography, Box, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    tabs: {
        // width: theme.spacing(32)
    },
    login: {
        position: 'relative',
        top: '21%',
        background: '#fff',
        margin: '20% auto',
        width: theme.spacing(38),
        height: theme.spacing(42)
    },
    form: {

    },
    mybtn: {
        margin: '10px auto',
        textAlign: 'center'
    }
}))

const a11yProps = (index: any) => {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`
    }
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

const SimpleTabs = () => {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }

    return (
        <div className={classes.tabs}>
            <Tabs value={value} onChange={handleChange} className={classes.tabs}>
                <Tab label="登陆" {...a11yProps(0)}></Tab>
                <Tab label="二维码登陆" {...a11yProps(1)}></Tab>
            </Tabs>
            <TabPanel value={value} index={0}>
                <LoginForm></LoginForm>
            </TabPanel>
            <TabPanel value={value} index={1}></TabPanel>
        </div>
    )
}

const LoginForm = () => {
    const classes = useStyles();
    return (
        <form className={classes.form}>
            <div>
                <TextField required id="standard-required" label="name" defaultValue="" />
                <TextField required id="standard-required" label="name" defaultValue="" />
                {/* <Button onClick={}></Button> */}
            </div>
        </form>
    )
}

const Login = () => {
    const classes = useStyles();

    const url = 'https://github.com/login/oauth/authorize?client_id=c7f5f5ad65cc93ba7fa8&redirect_uri=http://localhost:3000/auth/github';

    return (
        <div>
            <Pager className={classes.login}>
                <SimpleTabs></SimpleTabs>
                <div className={classes.mybtn}>
                    <Button href={url} variant="contained" color="secondary">login with github</Button>
                </div>
            </Pager>
        </div>
    )
}


export default Login;