import {useState,useEffect, useContext} from "react";
import Box from '@mui/material/Box';
import { Paper, Typography, Divider } from '@mui/material';
import {TaskUpdate, ActiveTasks} from "./Contexts";

export default function ActiveTasklist () {
    const [activeTasks,setActiveTasks] = useContext(ActiveTasks);
    const [tasks,setTasks] = useState([]);

    // Fetch active tasks
    useEffect(() => {
        const url = "http://localhost:3010/tasks";
        fetch(url).then((response) => response.json()).then((response) => {
            let temp = [];
            response.map((x) => {
                if(x.status.active == true){
                temp.push(x);
            }})
            setTasks(temp);
        })
    },[activeTasks])

    return (
        <Box>
            <Typography variant="h4">Active Tasks</Typography>
            <Divider/>
            {tasks.map((x,i) => (<Paper key={x + "_" + i} sx={{m: 2,bgcolor: "lightGreen"}}><Typography variant="h5">{x.taskName}</Typography>
            </Paper>))}            
        </Box>
    );
}
