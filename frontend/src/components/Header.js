import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import React, { useState, useEffect, useContext } from 'react';


const Header = () => {
    const [name, setName] = useState('');
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/items');
                // setUser([]);
                setUser(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    });

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const resetInputs = () => {
        setName('');
    };

    const Delete = (props) => {
        console.log(props);
        try {
            const res = axios.delete(`http://localhost:4000/items/${props._id}`)
            console.log(res)
        }
        catch (err) {
            console.log(err);
        }
        window.location.reload(false);
    };

    const Submit = () => {
        const res = {
            name: name
        };
        axios
            .post("http://localhost:4000/items", res)
            .then((response) => {
                console.log(response.data);
                user.push(response.data);
            });
        resetInputs();
        window.location.reload(false);
    };

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
                <Grid item xs={12}>
                    <h1>Task List:</h1>
                    <br></br>
                    <div className="users">
                        {user.map((u) => (
                            <div>
                                <h3>{u.name}</h3>
                                <ButtonGroup variant="contained" type="submit" onClick={() => Delete(u)}>
                                    <Button>Delete</Button>
                                </ButtonGroup>
                            </div>
                        ))}

                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Header
