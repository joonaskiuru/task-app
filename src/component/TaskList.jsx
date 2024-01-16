import * as React from 'react';
import {useState,useEffect, useContext} from "react";
import Box from '@mui/material/Box';
import Task from "./Task";
import { Typography, Stack, Chip } from '@mui/material';
import {TaskUpdate} from "./Contexts";

export default function TaskList () {
    const [taskUpdate,setTaskUpdate] = useContext(TaskUpdate);
    const [tasks,setTasks] = useState([])

    useEffect(() => {
        const url = "http://localhost:3010/tasks";
        fetch(url).then((response) => response.json()).then((response) => {
            setTasks(response)
            setTaskUpdate(false);
        })
    },[])

    return (
        <Box>
            {tasks.map((x,i) => <Task key={x + "_" + i} {...x}/>)}
        </Box>
    );
}

