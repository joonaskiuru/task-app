import {useState, useEffect} from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography, Select, MenuItem, Stack, Chip, TextField } from '@mui/material';
import TaskInfo from "./TaskInfo";

function Analytics() {

    const [tasks,setTasks] = useState([])
    const [categories,setCategories] = useState([]);
    const [filterCategory,setFilterCategory] = useState('All');
    const [tags,setTags] = useState([]);

    // Set categories
    useEffect(() => {
        const urlCategory = "http://localhost:3010/categories";
        fetch(urlCategory).then((response) => response.json()).then((response) => {
            setCategories(response)
        })
    },[])

    // Filter categories
    useEffect(() => {
        if(filterCategory != 'All'){
            const url = `http://localhost:3010/tasks?category=${filterCategory}`;
            fetch(url).then((response) => response.json()).then((response) => {
                if(tags.length > 0){
                    var temp = [];
                    var matches = 0;
                    response.map((x) => {
                        x.tags.map((y) => {
                            if(tags.includes(y)){
                                matches += 1;
                            }
                        })
                        if(matches == tags.length){
                            temp.push(x)
                            matches = 0;
                        }
                    })
                    temp = [...new Set(temp)];
                    setTasks(temp)
                }
                else {
                    setTasks(response)
                }
            })
        }
        else {
            const url = "http://localhost:3010/tasks";
            fetch(url).then((response) => response.json()).then((response) => {
                if(tags.length > 0){
                    var temp = [];
                    var matches = 0;
                    response.map((x) => {
                        x.tags.map((y) => {
                            if(tags.includes(y)){
                                matches += 1;
                            }
                        })
                        if(matches == tags.length){
                            temp.push(x)
                            matches = 0;
                        }
                    })
                    temp = [...new Set(temp)];
                    setTasks(temp)
                }
                else {
                    setTasks(response)
                }
            })
        }

    },[filterCategory,tags])

    // Handle category change
    const handleChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    // Enter tags by pressing Enter
    function handleKeyDown(e) {
        if(e.key === 'Enter') {
            e.preventDefault();

            // Don't allow empty tags
            if(!e.target.value){
                return
            }

            const tag = e.target.value.toLowerCase();
            setTags([...tags,tag]);
            e.target.value = '';
            return
        }
        return
    }

    // Delete tags
    function handleDelete (key) {
        const arr = tags.filter(item => item !== key)
        setTags(arr);
    }

    return (
        <> 
        <Box sx={{ flexGrow: 1,bgcolor: "lightGrey",height: '100vh' }}>

            <Grid container spacing={1}>
            <Grid item xs={12} lg={5} sx={{m: 1}}>
                <Item>
                <Paper sx={{ m: 2, p: 1}}><Typography variant="h6" sx={{color: 'text.secondary'}}>Analytics</Typography>
            <Typography sx={{ mx: 1, p: 1}} >See statistics and analytics for the tasks.</Typography>
                <Box>
                    <Select sx={{ width: '40%',mx: 2}} name="category" size="small" value={filterCategory} onChange={handleChange}>
                    <MenuItem value='All'>All</MenuItem>
                        {categories.map((x,i) => 
                            <MenuItem value={x} key={x + "_" + i}>{x}</MenuItem>
                        )}
                    </Select>
                </Box>
                <TextField sx={{m: 2, mb: 0}} id="tags" label="Insert Tags Here" name="tags" size="small" onKeyDown={handleKeyDown}/><br /><br />
                <Stack direction="row" spacing={1}>
                {tags.map((x,i) => 
                <Chip
                key={x + '_' + i} 
                label={x} 
                onDelete={() => handleDelete(x)}
                />)}
                </Stack>
            </Paper>
                </Item>
                </Grid>



                <Grid item xs={12} lg={6} sx={{m: 1}}>
                <Item>
                {tasks.map((x,i) => <TaskInfo key={x + "_" + i} sx={{ m: 2, p: 1}} {...x}/>)}   
                </Item>
                </Grid>
            </Grid>
        </Box>
    </>
    );
}
export default Analytics;