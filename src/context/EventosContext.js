import { createContext, useContext, useReducer } from "react";
import { misEventos } from '../eventos.js';




const EventosContext = createContext(null);
const EventosSetContext = createContext(null);
const EventosValidateContext = createContext(null);

export function EventosProvider({ children }) {
    const [eventos, dispatch] = useReducer(eventosReducer, misEventos);

    function handleAddEvento(newEvento){
        dispatch({
            type: 'new_evento',
            nombre: newEvento.nombre,
            fechaInicio: newEvento.fechaInicio,
            horaInicio: newEvento.horaInicio,
            fechaFin: newEvento.fechaFin,
            horaFin: newEvento.horaFin,
        })
    }

    function handleEditEvento(newEvento){
        dispatch({
            type: 'edit_evento',
            nombre: newEvento.nombre,
            fechaInicio: newEvento.fechaInicio,
            horaInicio: newEvento.horaInicio,
            fechaFin: newEvento.fechaFin,
            horaFin: newEvento.horaFin,
        })
    }

    function validarHorario(evento){
        const eventoInicio = new Date(evento.fechaInicio + 'T' + evento.horaInicio);
        const eventoFin = new Date(evento.fechaFin + 'T' + evento.horaFin);

    }

    function validateEvento(newEvento){
        //validar que no se solape con otro evento
        if(newEvento.nombre != '' && newEvento.fechaInicio != '' && newEvento.horaInicio != ''){
            return true;
        }
        console.log(newEvento);
        return false;
        
    }
    console.log(eventos);
    return(
        <EventosContext.Provider value={ eventos }>
            <EventosSetContext.Provider value={ handleAddEvento }>
                <EventosValidateContext.Provider value={ validateEvento }>
                    { children }
                </EventosValidateContext.Provider>
            </EventosSetContext.Provider>
        </EventosContext.Provider>    
    )
}

export function useEventos(){
    return useContext(EventosContext);
}

export function useEventosSet(){
    return useContext(EventosSetContext);
}

export function useEventosValidate(){
    return useContext(EventosValidateContext);
}

function eventosReducer(state, action) {
    const lastId = state.slice().sort(( a, b ) => {
        return a.id > b.id ? -1 : 1;
    })[0].id;
    switch(action.type){
        case 'new_evento':
            return [
                ...state,
                {
                    id: lastId + 1,
                    nombre: action.nombre,
                    fechaInicio: action.fechaInicio,
                    horaInicio: action.horaInicio,
                    fechaFin: action.fechaFin,
                    horaFin: action.horaFin,
                },
            ]
        case 'edit_evento':
            return state.map((evento)=>{
                if(evento.id === action.id){
                    return {
                        id: evento.id,
                        nombre: action.nombre,
                        fechaInicio: action.fechaInicio,
                        horaInicio: action.horaInicio,
                        fechaFin: action.fechaFin,
                        horaFin: action.horaFin,
                    }
                } else {
                    return evento;
                }
            })
        default:{
            throw Error('Unknown action: ' + action.type);
        }
    }
}