import {useState,useEffect, useContext} from "react";
import { Box, TextField, Typography,Divider, Button, Chip, Stack, MenuItem, Select, Alert} from '@mui/material';
import { TaskUpdate } from './Contexts';
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function TaskForm() {

    // Initialize needed state variables
    const [taskUpdate,setTaskUpdate] = useContext(TaskUpdate);
    const [categories,setCategories] = useState([]);
    const [taskTags,setTags] = useState([]);
    const [alert, setAlert] = useState(false);
    const [formData, setFormData] = useState({
    taskName: '',
    category: '',
    status: {active: false, activatedTime: ''},
    taskHistory: [],
    tags: [],
    });

    // Fetch predefined categories from JSON database
    useEffect(() => {
        const url = "http://localhost:3010/categories";
        fetch(url).then((response) => response.json()).then((response) => {
            setCategories(response)
        })
    },[])

    // Update Tags
    useEffect(() => {
        setTags(taskTags)
        setFormData(formData =>( {...formData,
            ["tags"]: taskTags,
        }))
    },[taskTags])

    // Tags are entered with pressing Enter
    function handleKeyDown(e) {
        if(e.key === 'Enter') {
            e.preventDefault();

            // Don't allow empty tags
            if(!e.target.value || taskTags.includes(e.target.value.toLowerCase())){
                e.target.value = '';
                return
            }

            const tag = e.target.value.toLowerCase();
            setTags([...taskTags,tag]);
            e.target.value = '';
            return
        }
        return
    }

    // Handle change in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,
            [name]:value,
            ["tags"]: taskTags,
        })
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.category){
            setAlert(true)
            return
        }
        else {
            const url = "http://localhost:3010/tasks"
            fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                setTaskUpdate(true)
                setAlert(false)
                setTags([])
                setFormData({
                    taskName: '',
                    category: '',
                    status: {active: false, activatedTime: ''},
                    taskHistory: [],
                    tags: [],
                })
            })
        }
    }

  return (
    <Box
    sx={{display: "flex",flexDirection: "column", justifyContent: 'center'}}
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}
    >
    <Typography sx={{m: 1}} variant="h5">Create a Task</Typography>    
    <Divider/>
    <TextField 
    sx={{m: 2}} 
    id="taskName" 
    label="Insert Task Name Here" 
    variant="standard" 
    value={formData.taskName} 
    name="taskName"
    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
    onChange={handleChange}
    />
    <Typography> Select Task Category: </Typography>
    <Select sx={{ m: 2, display: 'block'}} name="category" size="small" value={formData.category} onChange={handleChange}>
        {categories.map((x,i) => 
            <MenuItem value={x} key={x + "_" + i}>{x}</MenuItem>
        )}
    </Select>
    <TextField variant="outlined" id="tags" label="Insert Tags Here" name="tags" onKeyDown={handleKeyDown}/><br /><br />

    <Stack direction="column" spacing={1}>
    {taskTags.map((x,i) => <Chip key={x + '_' + i} label={x}></Chip>)}
    </Stack>
    <Button variant="contained" type="submit" value="Submit" sx={{ m: 2,bgcolor: 'success.light' }}><PostAddIcon/>Add Task</Button>
    <Alert sx={{display: alert ? 'flex' : 'none'}} severity="error">Please provide a category.</Alert>
    </Box>
  );
}