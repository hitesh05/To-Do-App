import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import React, { useState, useEffect, useContext } from 'react';
import { useResolvedPath } from "react-router-dom";

const Display = () => {
    const [user, setUser] = useState([]);

    const Update = () => {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await axios.get(`http://localhost:4000/items`)
                    setUser(res.data);
                }
                catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        }, [])
    }

    const Delete = (props) => {
        console.log(props);
        try {
            const res = axios.delete(`http://localhost:4000/items/${props._id}`)
            console.log(res)
        }
        catch (err) {
            console.log(err);
        }
    }

    Update();

    return (
        <Grid container align={'center'} spacing={2}>
            <Grid item xs={12}>
                <h1>Task List</h1>
                <br></br>
                {/* {dis(user)} */}
                <div className="users">
                    {user.map((u) => (
                        <div>
                            <h3>{u.name}</h3>
                            {/* {console.log('aithe')}
                            {console.log(u._id)} */}
                            <ButtonGroup variant="contained" type="submit" onClick={() => Delete(u)}>
                                <Button>Delete</Button>
                            </ButtonGroup>
                        </div>
                    ))}

                </div>
            </Grid>
        </Grid>
    )
};

export default Display