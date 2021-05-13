import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
  data: [
    {
      name: 'Pendente',
      cards:[
        {
          name:'Emitir nota fiscal Diferpan',
          description: 'emitir nota fiscal, CFOP 6525',
          responsavel: 'Poliana'
        }
      ]
    },
    {
      name: 'Em processo',
      cards:[
        {
          name:'Conferir desafio Alan Florencio',
          description: 'Testar aplicação Alan Florencio',
          responsavel: 'Daniel'
        }
      ]
    },
    {
      name: 'Concluído',
      cards:[
        {
          name:'Pagamento de boletos',
          description: 'Pagar boletos de Abril',
          responsavel: 'Daniel'
        }
      ]
    }
  ]
}

function Tasks(state = INITIAL_STATE, action){
  
  switch (action.type){
    case 'ADD':{
      const data = [...state.data];
      data[action.columnIndex].cards.push(action.card);
      return { ...state, data: data}
    }
    case 'MOVE':{

      const data = [...state.data];
      const [ card ] = data[action.columnIndex].cards.splice(action.cardIndex, 1);
      const columnIndex = action.columnIndex + action.direction;
      data[columnIndex].cards.push(card);
      
      if(columnIndex === 2 ){
        toast('🎉 Parabéns tarefa concluida! 🎉', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      
      return { ...state, data:data}
    }
    case 'EDIT':{

      const data = [...state.data]
      data[action.columnIndex].cards.splice(action.cardIndex, 1)
      data[action.columnIndex].cards.push(action.card)

      return { ...state, data: data}
    }
    case 'DELETE':{

      const data = [...state.data]
      data[action.columnIndex].cards.splice(action.cardIndex, 1)
      
      return { ...state, data: data}
    }
    default:
      return state
  }
}

const store = createStore(
  Tasks,  
  composeWithDevTools(
    applyMiddleware()
  )
);

export default store