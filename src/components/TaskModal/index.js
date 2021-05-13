import { useState, useEffect } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Formik, Form, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		marginRight: theme.spacing(1),
		flex: 1,
	},
  textFieldFirts: {
		marginRight: theme.spacing(1),
		flex: 1,
    width: '465px'
	},
	extraAttr: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	btnWrapper: {
		position: "relative",
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600]
    }
	},
  btnDelete:{
    marginRight: "178px",
  }
}));

// formulario para cria e atualizar tasks
const TaskModal = ({ open, onClose, initialValues, columnIndex, cardIndex }) => {
  
	const initialState = {
		name: "",
		description: "",
		responsavel: "",
	};

  const [ task, setTask] = useState(initialState);
  const [ btnDelete, setDelete] = useState(false);
  const taskStatus = 0;

  useEffect(() => {
		const fetchTask = async () => {
			if (initialValues) {
				setTask(prevState => {
					return { ...prevState, ...initialValues };
				});
			}
			if (columnIndex | columnIndex <= 0){
        setDelete(true)
      };
		};

		fetchTask();
	}, [initialValues, columnIndex]);

  const dispach = useDispatch();

  const handleClose = () => {
    onClose()
  }

  const handeDelete = (values) => {
    if (columnIndex | columnIndex <= 0) {
      const card = values;
      dispach({type: 'DELETE', card, columnIndex, cardIndex})
      onClose()
    }
  }

  const handleSave = (values) => {

    if (columnIndex | columnIndex <= 0) {
      const card = values;
      console.log(values)
      dispach({type: 'EDIT', card, columnIndex, cardIndex})
      onClose()
    } else {
      const card = values;
      const columnIndex = taskStatus;
  
      dispach({type: 'ADD', card, columnIndex})
      onClose()
      toast('🚀  Tarefa salva com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" scroll="paper">
      <DialogTitle id="form-dialog-title">
        Atividade
      </DialogTitle>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={(values) => {
          handleSave(values)
        }}
      >
        <Form>
          <DialogContent dividers>
            <div>
              <Field
                as={TextField}
                label={'Nome'}
                name="name"
                autoFocus
                required
                variant="outlined"
                margin="dense"
                className={classes.textFieldFirts}
              />
            </div>
            <div>
              <Field
                as={TextField}
                label={'Descrição'}
                name="description"
                autoFocus
                rows={4}
                multiline
                variant="outlined"
                margin="dense"
                className={classes.textFieldFirts}
              />
            </div>
              <Typography 									
                style={{ marginBottom: 8,
                marginTop: 12 }}
                variant="subtitle1"
              > 
                Informações Extras:
              </Typography>
            <div>
              <Field
                as={TextField}
                label={'Responsável'}
                name="responsavel"
                autoFocus
                variant="outlined"
                margin="dense"
                className={classes.textField}
              />
            </div>
          </DialogContent>
          <DialogActions>
            { btnDelete === true &&  
              <Button
                onClick={() => handeDelete()}
                color="secondary"
                className={classes.btnDelete}
                variant="outlined"
              >
                Excluir
              </Button> 
            }
            <Button
              onClick={handleClose}
              color="secondary"
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.btnWrapper}
            >
              Salvar
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  )
}

export default TaskModal