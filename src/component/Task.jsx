import * as React from 'react';
import {Box, Divider, Typography, Paper, Stack, Chip, Button} from '@mui/material';
import {useState,useEffect, useContext} from "react";
import {TaskUpdate, ActiveTasks} from "./Contexts";
import EditTask from "./EditTask";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';


export default function Task (props) {
    const [taskUpdate,setTaskUpdate] = useContext(TaskUpdate);
    const [activeTask,setactiveTask] = useState(props.status.active);
    const [activeTasks, setActiveTasks] = useContext(ActiveTasks);
    const [startTime, setStartTime] = useState('')
    const [taskHistory,setTaskHistory] = useState('');

    // Delete selected task
    function deleteTask() {
        const url = "http://localhost:3010/tasks/" + props.id;
        fetch(url,{
            method: 'DELETE',
          }).then(() => setTaskUpdate(true));
        
    }

    useEffect(() => {

        // If create a new entry if task is activated
        if(activeTask){
            if(!props.status.activatedTime){
                setActiveTasks(activeTasks + 1)
                setStartTime(new Date()) 
                const data = {...props,['status']: {['active']: true, ['activatedTime']: new Date()}};
                const url = "http://localhost:3010/tasks/" + props.id;
                fetch(url, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)})
            }
            else {
                setStartTime(props.status.activatedTime)
            }

        }
        else {
            if (startTime) {
                setActiveTasks(activeTasks - 1)
                const endTime = new Date()
                const url = "http://localhost:3010/tasks/" + props.id;
                const times = taskHistory.concat({'Start': startTime, 'End': endTime})
                const data = {...props,['status']: {['active']: false, ['activatedTime']: ''},['taskHistory']: times};
                fetch(url, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }).then(() => {
                    setStartTime('');
                });
            }
        }
    },[activeTask])

    // Save task activity
    useEffect(() => {
        const url = "http://localhost:3010/tasks/" + props.id;
        fetch(url).then((response) => response.json()).then((response) => {
            setTaskHistory(response.taskHistory)
            
        })
    },[startTime])

    return (
        <Box>
            <Paper sx={{m: 2,p: 1,boxShadow: 3,bgcolor: (activeTask ? 'lightGreen' : 'white')}} >
                <Typography variant="h6">{props.taskName}</Typography>
                <Divider sx={{'maxWidth': '70%',m: 'auto'}}/>
                <Typography sx={{p: 1}}>{props.category}</Typography>
                <Chip label="Active" sx={{width: "50%", mx: "auto", my: 1, bgcolor: "success.dark",color: "white",p: 1, display: (activeTask ? 'block' : 'none')}}/>
                <Box>
                    <Stack direction="row" sx={{flexWrap: 'wrap', gap: 1}} spacing={1}>
                        {props.tags.map((x,i) => <Chip sx={{boxShadow: 3,bgcolor: 'primary.dark',color: 'white'}} label={x} key={x + "_" + i}/>)}
                    </Stack>
                </Box>
                <Box sx={{m: 'auto'}}>
                <Button variant="contained" size="small" sx={{'m': 1, 'bgcolor': activeTask ? 'warning.dark' : 'success.main', ':hover': {'bgcolor': (activeTask ? 'warning.main' : 'success.dark')}}} onClick={() => {setactiveTask( activeTask ? false : true )}}>{activeTask ? ["Stop",<StopIcon key="Stop"/>,] : ["Activate",<PlayArrowIcon key="play"/>]}</Button>
                <Button onClick={deleteTask} variant="contained" size="small" sx={{'m': 1,'bgcolor': 'error.dark','color': 'white',':hover': {'bgcolor': 'error.main'}}}>Delete<DeleteIcon/></Button>
                <EditTask {...props} />
                </Box>
            </Paper>
        </Box>
    );
}