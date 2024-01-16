import {useState} from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography } from '@mui/material';
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import {TaskUpdate, ActiveTasks} from "./Contexts";
import ActiveTasklist from "./ActiveTasklist";
 
function Home () {
    const [taskUpdate,setTaskUpdate] = useState(true)
    const [activeTasks,setActiveTasks] = useState(0)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        }));

    return (
    <> 
        <Box sx={{ flexGrow: 1,bgcolor: "lightGrey",minHeight: '100vh' }}>
            <Paper sx={{ m: 2, p: 1,display: {xs: "none", sm: 'block'}}}>
                <Typography variant="h6" sx={{color: 'text.secondary'}}>Manage Your Tasks Here</Typography>
                <Typography>Create and monitor your tasks from here.</Typography>
            </Paper>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={4} sx={{m: 1}}>
                    <Item>
                        <TaskUpdate.Provider value={[taskUpdate,setTaskUpdate]}>
                            <TaskForm/>
                        </TaskUpdate.Provider>
                    </Item>
                </Grid>
                <Grid item xs={12} md={5} lg={4} sx={{m: 1}}>
                    <Item>
                        <TaskUpdate.Provider value={[taskUpdate,setTaskUpdate]}>
                            <ActiveTasks.Provider value={[activeTasks, setActiveTasks]}>
                                <TaskList/>
                            </ActiveTasks.Provider>
                        </TaskUpdate.Provider>
                    </Item>
                </Grid>
                <Grid item xs={12} md={5} lg={3} sx={{m: 1}}>
                    <Item sx={{minHeight: '70vh'}}>
                        <ActiveTasks.Provider value={[activeTasks, setActiveTasks]}>
                            <ActiveTasklist/>
                        </ActiveTasks.Provider>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    </>
);
}
 
export default Home;