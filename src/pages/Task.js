import React, { useState } from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import TaskList from '../components/TaskList'
import TaskModal from '../components/TaskModal'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600]
    }
  }
}));

const Task = () => {

  const initialValues = {
    name: '',
    description: '',
    responsavel: ''
  }

	const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles();

  return (
    <div className={classes.root} >
      <TaskModal
        open={open}
        onClose={handleClose}
        initialValues={initialValues}
      >
      </TaskModal>
      <TaskList/>
      <Fab color="primary" size="large" aria-label="add" className={classes.fab} onClick={() => setOpen(true)} >
        <AddIcon />
      </Fab>
    </div>
  )
}



export default Task