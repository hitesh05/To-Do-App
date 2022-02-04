import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import React, { useState, useEffect, useContext } from 'react';


const Header = () => {
    const [name, setName] = useState('');
    const [user, setUser] = useState([]);
    const [edit, setEdit] = useState(false);
    const [name_edit, setNameEdit] = useState('');

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
        setNameEdit('');
        setEdit(false);
    };

    const Delete = async (props) => {
        console.log(props);
        try {
            const res = await axios.delete(`http://localhost:4000/items/${props._id}`)
            console.log(res)
        }
        catch (err) {
            console.log(err);
        }
        resetInputs();
    };

    const Edit = async (props) => {
        // console.log(props);
        const res = {
            id: props._id,
            name: name_edit
        };
        await axios
            .put(`http://localhost:4000/items/${props._id}`, res)
            .then((r) => {
                console.log(r.data);
            })
            .catch((e) => {
                console.log(e);
            });
        resetInputs();
    };

    const onChangeNameEdit = (e) => {
        setNameEdit(e.target.value);

    };

    const Submit = async () => {
        const res = {
            name: name
        };
        await axios
            .post("http://localhost:4000/items", res)
            .then((response) => {
                console.log(response.data);
                user.push(response.data);
            });
        resetInputs();
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
                        {user.map((u, idx) => (
                            <div>
                                <div key={idx}>
                                    <h3>{u.name}</h3>
                                    <ButtonGroup variant="contained" type="submit" onClick={() => Delete(u)}>
                                        <Button>Delete</Button>
                                    </ButtonGroup>
                                    <ButtonGroup variant="contained" type="submit" onClick={() => setEdit(true)}>
                                        <Button>Edit</Button>
                                    </ButtonGroup>
                                </div>
                                <div>
                                    {edit &&
                                        <div>
                                            <TextField
                                                label="New name"
                                                variant="outlined"
                                                value={name_edit}
                                                onChange={onChangeNameEdit}
                                            />
                                            <ButtonGroup variant="contained" type="submit" onClick={() => Edit(u)}>
                                                <Button>Submit</Button>
                                            </ButtonGroup>
                                            <ButtonGroup variant="contained" color='secondary' type="submit" onClick={() => setEdit(false)}>
                                                <Button>Cancel</Button>
                                            </ButtonGroup>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}

                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Header
