import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Column from '../column';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 'auto',
    width:' 100%',
    padding: '10px'
  }
}));

// Display collumns Pedente, processo e concluido
const TaskList = () => {

  const tasks = useSelector(state => state.data)
  const dispach = useDispatch();

  const DIRECTION_LEFT = -1;
  const DIRECTION_RIGHT = 1;

  const handleMove = (columnIndex, cardIndex, direction) => {
    dispach({type: 'MOVE', cardIndex, columnIndex, direction})
  }

  const classes = useStyles();

  return (
    <div className={classes.root} >
      {tasks.map((column, columnIndex) => (
        <Column
          column={column}
          columnIndex={columnIndex}
          key={columnIndex}
          moveLeft={cardIndex => handleMove(columnIndex, cardIndex, DIRECTION_LEFT)}
          moveRight={cardIndex => handleMove(columnIndex, cardIndex, DIRECTION_RIGHT)}
        />
      )) }
    </div>
  );
}

export default TaskList;