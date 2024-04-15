import { useState } from 'react';
import { useHoy } from './context/HoyContext.js';
import { useEventos } from './context/EventosContext.js';
import FormEvento from './FormEvento.js';
import Dia from './Dia.js'


export default function Agenda() {
    const eventos = useEventos();
    const [ estado, setEstado ] = useState('leer');

    const leyendo = estado === 'leer';
    const agregando = estado === 'agregando';
    const editando = estado === 'editando';

    const hoy = useHoy();
    const maniana = new Date('2024-03-19T20:00:00');
    const ayer = new Date('2024-03-17T20:00:00');
    const [ mesNow, diaNow, anioNow ] = [
        hoy.getMonth(), 
        hoy.getDate(),
        hoy.getFullYear(),
    ]

    const eventoEnBlanco = {
        nombre: '',
        eventoInicio: '1994-01-01T00:00:00.000Z',
        eventoFin: '1994-01-01T00:00:00.000Z',
    }

    const eventosHoy = eventos.filter((evento) => {
        let fecha = new Date(evento.fechaInicio + 'T' + evento.horaInicio );

        return (mesNow === fecha.getMonth() && diaNow === fecha.getDate() && anioNow === fecha.getFullYear());
    }).sort(( a, b ) => {
        return b.horaInicio > a.horaInicio ? -1 : 1;
    })

    const eventosAyer = eventos.filter((evento) => {
        let fecha = new Date(evento.fechaInicio + 'T' + evento.horaInicio );

        return (mesNow === fecha.getMonth() && diaNow - 1 === fecha.getDate() && anioNow === fecha.getFullYear());
    }).sort(( a, b ) => {
        return b.horaInicio > a.horaInicio ? -1 : 1;
    })

    const eventosManiana = eventos.filter((evento) => {
        let fecha = new Date(evento.fechaInicio + 'T' + evento.horaInicio );

        return (mesNow === fecha.getMonth() && diaNow + 1 === fecha.getDate() && anioNow === fecha.getFullYear());
    }).sort(( a, b ) => {
        return b.horaInicio > a.horaInicio ? -1 : 1;
    })

    function handleClickAgregarEvento(){
        setEstado('agregando');
    }

    function handleClickGuardarEvento(){
        setEstado('leer');
    }

    return(
        <div className="container">
            <h1>Mi agenda</h1>
            {leyendo && <button type="button" className="btn btn-primary" onClick={handleClickAgregarEvento}>Agregar evento</button>}
            {agregando && <FormEvento eventoInicial={eventoEnBlanco} error={null} onSubmit={handleClickGuardarEvento}/>}
            
            <Dia eventos={ eventosHoy } dia={ hoy }/>
            <Dia eventos={ eventosAyer } dia={ ayer }/>
        </div>
    );
}

