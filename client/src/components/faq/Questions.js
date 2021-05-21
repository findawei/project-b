import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const Questions = () => {

const useStyles = makeStyles(() => ({
        root: {
            flexGrow: 1,
            margin: 20,
        },
    }));

const classes = useStyles();

return(
    <div>
        <h1>Frequently Asked Questions</h1>
        bla bla bla
    </div>
)
}

export default Questions;