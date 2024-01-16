import React from "react";
import {useState, useEffect} from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

 
function Info() {
    return (
    <>
    <Box sx={{ flexGrow: 1,bgcolor: "lightGrey",minHeight: '100vh', p: 1 }}>
        <Paper sx={{p:1}}>
            <Typography variant="h5">Info</Typography>
            <Divider sx={{my: 1}}/>
            <Typography variant="subtitle2" sx={{color: 'primary.dark'}}>Made By: Joonas Kiuru</Typography>
            <Typography variant="subtitle2">Used work hours: 31 Hours (based on my work diary)</Typography>
            <Typography variant="subtitle2">No AI Generated code. AI used only once for brief debugging of a specific problem.</Typography>
            <Typography variant="h6" sx={{my: 1}}>Challenges</Typography>
            <Typography variant="subtitle2" >STATES (Most Difficult): I had trouble keeping up with all the states involved, and updating them correctly.</Typography>
            <Typography variant="subtitle2">MATERIAL UI: Usage of Material UI was challenging, because it changes the way everything is done visually,
             and I didn't have experience with it before.</Typography>
             <Typography variant="subtitle2" >RENDERING: I had problems sometimes controlling the amount of renders to avoid re-renders.</Typography>
        </Paper>

        <Paper sx={{p:1, my: 1}}>
            <Typography variant="h6">Instructions</Typography>
            <Divider sx={{my: 1}}/>
            <Typography>You can create and view tasks from Home page. Use the "Create a Task" - section to create tasks.</Typography>
            <Typography>You get a more detailed view of the tasks from Analytics page. Use the category- & tag filter to filter results.</Typography>
            <Divider sx={{my: 1}}/>
            <Typography color='success.main'><PlayArrowIcon fontSize="small" /> Press the Activate - button to activate tasks.</Typography>
            <Typography color='error.dark'><DeleteIcon fontSize="small" /> Press the Delete - button to delete tasks.</Typography>
            <Typography color='primary.main'><EditIcon fontSize="small" /> Press the Edit - button to edit tasks.</Typography>
        </Paper>
    </Box>
    
    
    </>
    );
}

export default Info;