import {useState, Fragment, useEffect, useContext} from 'react';
import {Box, Button, Stack, Typography, Select, TextField, MenuItem, Divider, Chip} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import {TaskUpdate} from "./Contexts";


export default function EditTask(props) {
  const [taskUpdate,setTaskUpdate] = useContext(TaskUpdate);
  const [open, setOpen] = useState(false);
  const [category,setCategory] = useState(props.category);
  const [categories,setCategories] = useState([]);
  const [tags,setTags] = useState(props.tags);
  const [taskName, setTaskName] = useState(props.taskName)
  const [formData, setFormData] = useState({
  taskName: props.taskName,
  category: props.category,
  status: props.status,
  taskHistory: props.taskHistory,
  tags: props.tags,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskUpdate(true)
  };

  useEffect(() => {
    const url = "http://localhost:3010/categories";
    fetch(url).then((response) => response.json()).then((response) => {
        setCategories(response)
    })
  },[])

  // Update Tags
  useEffect(() => {
      setTags(tags)
      setFormData({...formData,
          ["tags"]: tags,
      })
  },[tags])

  // Tags are entered with pressing Enter
  function handleKeyDown(e) {
    if(e.key === 'Enter') {
      e.preventDefault();

      // Don't allow empty tags
      if(!e.target.value || tags.includes(e.target.value.toLowerCase())){
        e.target.value = '';
        return
      }

      const tag = e.target.value.toLowerCase();
      setTags([...tags,tag]);
      e.target.value = '';
      return
    }
    return
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,
      [name]:value,
      ["tags"]: tags,
    })
  };

  const handleSubmit = (e) => {
    if(!formData.category){
        alert('Provide a category.')
        return
    }
    else {
      e.preventDefault();
      const url = `http://localhost:3010/tasks/${props.id}`
      fetch(url, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      })
      .then(() => {
        setTaskUpdate(true);
        handleClose()})
    }
  }


  // Delete tags
  function handleDelete (key) {
    const arr = tags.filter(item => item !== key)
    setTags(arr);
  }

  return (
    <Fragment>
      <Button size="small" sx={{'m': 1}} variant="contained" onClick={handleClickOpen}>Edit<EditIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{textAlign: "center"}}>Edit Task</DialogTitle>
        <DialogContent>
          <Box sx={{display: "flex",flexDirection: "column"}}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          >
            <Divider/>
            <TextField 
            sx={{m: 2}} 
            id="taskName" 
            label="Insert Task Name Here" 
            variant="standard" 
            value={formData.taskName} 
            name="taskName" 
            onChange={handleChange}
            />
            <Typography sx={{textAlign: "center"}}> Select Task Category: </Typography>
            <Select name="category" size="small" value={formData.category} onChange={handleChange}>
                {categories.map((x,i) => 
                    <MenuItem value={x} key={x + "_" + i}>{x}</MenuItem>
                )}
            </Select>
            <TextField sx={{m: 2, mb: 0}} id="tags" label="Insert Tags Here" name="tags" size="small" onKeyDown={handleKeyDown}/><br /><br />
                <Stack direction="row" spacing={1}>
                {tags.map((x,i) => 
                <Chip
                key={x + '_' + i} 
                label={x} 
                onDelete={() => handleDelete(x)}
                />)}
                </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
