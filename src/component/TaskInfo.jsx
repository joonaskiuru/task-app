import * as React from 'react';
import {Box, Typography, Paper, Stack, Chip, Button, Divider} from '@mui/material';
import {useState,useEffect, useContext} from "react";

export default function TaskInfo (props) {

    const [totalTime, setTotalTime] = useState(0)
    
    useEffect(() => {
        let temp = 0;
        props.taskHistory.map((x) => {
            let startTime = new Date(x.Start)
            let stopTime = new Date(x.End).getTime();
            let diff = Math.abs(stopTime - startTime);
            temp += diff;
        });

        // let ms = temp % 1000;
        let ss = String(Math.floor(temp / 1000) % 60);
        let mm = String(Math.floor(temp / 1000 / 60) % 60);
        let hh = String(Math.floor(temp / 1000 / 60 / 60));
        
        let elapsedTime = `Total time: ${hh < 10 ? '0' + hh : hh}:${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`;
        
        setTotalTime(elapsedTime);

    },[])

    return (
        <Box>
            <Paper sx={{m: 2,p: 1,boxShadow: 3}} >
                <Typography variant="h6">{props.taskName}</Typography>
                <Divider sx={{'maxWidth': '70%',m: 'auto'}}/>
                <Typography sx={{p: 1}}>{props.category}</Typography>
                <Paper sx={{bgcolor: 'primary.light',color: 'white',p: 1, m: 1}}>
                <Typography variant="subtitle2">{totalTime}</Typography>
                </Paper>
                <Box>
                    <Stack direction="row" sx={{flexWrap: 'wrap', gap: 1}} spacing={1}>
                        {props.tags.map((x,i) => <Chip sx={{boxShadow: 3,bgcolor: 'primary.dark',color: 'white'}} label={x} key={x + "_" + i}/>)}
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}