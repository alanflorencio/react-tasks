import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import TaskModal from '../TaskModal'

const useStyles = makeStyles((theme) => ({
  Card: {
    display: 'flex',
    padding: '10px',
    boxShadow: '0px 0px 2px #fff',
    marginTop: '15px',
    borderRadius: '5px',
    background: '#fff',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#eaeaea',
    }
  },
  Text:{
    flexGrow: 1,
    textAlign: 'center',
    color: '#5E6C84'
  },
  editButton: {
    width: '100%',
    textDecoration: 'none',
  },
  btn: {
    padding: 10,
  }
}));

// Diplays lista de tarefas por status
const Card = ({
  card,
  canMoveLeft,
  canMoveRight,
  moveLeft,
  moveRight,
  columnIndex,
  cardIndex
}) => {

  const [ open, setOpen ] = useState(false);
  const [ initialValues, setInitialValues ] = useState(false);
  
  const handleEdit = (card) => {
    setInitialValues(card)
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  const classes = useStyles();

  return(
    <div className={classes.Card} >
        <TaskModal
          open={open}
          initialValues={initialValues}
          columnIndex={columnIndex}
          cardIndex={cardIndex}
          onClose={handleClose}
        ></TaskModal>
        {canMoveLeft && <Button className={classes.btn} onClick={moveLeft}>{'<'}</Button>}
        <a className={classes.editButton} href='/#' onClick={() => handleEdit(card)} >
            <Typography 
              className={classes.Text}                
              variant="subtitle1"
            >
              {card.name}
            </Typography>
          </a>
        {canMoveRight && <Button onClick={moveRight}>{'>'}</Button>}
    </div>
  )
}

export default Card