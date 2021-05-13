import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { Formik, Form, Field } from "formik";

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Card from '../card'

const useStyles = makeStyles((theme) => ({
  column: {
    background: '#f2f2f2',
    boxShadow: '0px 0px 2px #f2f2f2',
    borderRadius: '10px',
    flexGrow: 1,
    textAlign: 'center',
    marginRight: '30px',
    marginLeft: '30px',
    display: 'block',
    width: '100%',
    padding: '10px',
    color: '#5E6C84',
  },
  title:{
    textAlign: 'left',
    color: '#5E6C84',
  },
  add:{
    paddingTop: '12px',
    width:'100%',
    textAlign: 'left',
    display: 'flex'
  },
  addText: {
    display: 'flex',
    textDecoration: 'none',
    color: '#5E6C84',
    '&:hover': {
      backgroundColor: '#eaeaea',
      borderRadius: '5px',
      width: '100%',
      maxWidth: '200px'
    }
  },
  btnField: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
  },
  root: {
    marginTop: '15px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: 'green'
  },
  iconButtonDelete: {
    padding: 10,
    color: 'red'
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

// Mapeia cada coluna por Pedente, processo e concluido
const Column = ({ column, columnIndex, moveRight, moveLeft }) => {

  const [open, setOpen] = useState(false);
  const initialValues = {name:'',}
  const dispach = useDispatch();

  const handleAdd = ( values, columnIndex ) => {

    const card = values;

    dispach({type: 'ADD', card, columnIndex});
    setOpen(false);

    toast('🚀  Tarefa salva com sucesso!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const classes = useStyles();

  return(
    <div className={classes.column}>
      <div className={classes.title}>
        <Typography variant="h6" gutterBottom>
          <Box fontWeight="fontWeightBold" m={1}>
            {column.name}
          </Box>
        </Typography>
      </div>
      { column.cards.map((card, cardIndex) => (
        <Card
          card={card}
          cardIndex={cardIndex}
          canMoveLeft={columnIndex !== 0}
          canMoveRight={columnIndex !== 2}
          columnIndex={columnIndex}
          key={cardIndex}
          moveLeft={() => moveLeft(cardIndex)}
          moveRight={() => moveRight(cardIndex)}
        />
      ))}

      { open === true &&
      <Paper>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values) => { handleAdd(values , columnIndex) }}
        >
          <Form
            className={classes.root}
          >
            <IconButton className={classes.iconButtonDelete} aria-label="menu" onClick={() => setOpen(false)}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
            <Field
              as={InputBase}
              className={classes.input}
              name='name'
              id='name'
              required
              placeholder="Digite o titulo da sua tarefa..."
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton}  type="subimit" >
              <AddIcon />
            </IconButton>
          </Form>
        </Formik>
      </Paper>}

      { open === false && 
      <div className={classes.add} >
        <a className={classes.addText} href='/#' onClick={() => setOpen(true)}>
          <span>
            <AddIcon/>
          </span>
          <span>
            <Typography
              variant="subtitle1"
              className={classes.addText}
            >
              Adicionar nova tarefa
            </Typography>
          </span>
        </a>
      </div>}
    </div>
  )
}

export default Column