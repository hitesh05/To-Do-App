import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Display from './Display';


const Header = () => {
    const [name, setName] = useState('');

    const onChangeName = (e) => {
        setName(e.target.value);
        // console.log(name);
    };

    const resetInputs = () => {
        setName('');
    };

    const Submit = () => {
        const res = {
            name: name
        };
        axios
            .post("http://localhost:4000/items", res)
            .then((response) => {
                console.log(response.data);
            });

        resetInputs();
    }

    return (
        <Grid container align={'center'} spacing={2}>
            <Grid item xs={12}>
                <h1>Add Task</h1>
                <TextField
                    label="Task"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
                />
                <ButtonGroup variant="contained" type="submit" onClick={() => Submit()}>
                    <Button>Submit</Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <Display /> 
            </Grid>
        </Grid>
    )
}
export default Header
