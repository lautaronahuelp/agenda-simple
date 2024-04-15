import { useState } from "react";
import { useEventosValidate, useEventosSet} from "./context/EventosContext";
import { cropDate, dateToLocaleString } from "./functions/custom_functions";

export default function FormEvento({eventoInicial, error, onSubmit}) {
    const [formState, setFormState] = useState(eventoInicial);
    const validarEvento = useEventosValidate();
    const addEvento = useEventosSet();
    console.log(formState);
    console.log(dateToLocaleString(new Date('2005-01-01T00:00:00.000Z')));
    function handleOnChangeNombre(e) {
        
        setFormState({
            ...formState,
            nombre: e.target.value,
        })
    }

    function handleOnChangeFechaInicio(e) {
        const evento = {...formState};
        //'0001-01-01T00:00:00.000Z'
        const newEventoInicio = new Date(cropDate(e.target.value) + 'T' + dateToLocaleString(new Date(formState.eventoInicio)).slice(11, 16) + '-03:00');
        newEventoInicio.setFullYear();

        const eventoInicio = new Date(formState.eventoInicio);
        eventoInicio.setFullYear(newEventoInicio.getFullYear());
        eventoInicio.setMonth(newEventoInicio.getMonth());
        eventoInicio.setDate(newEventoInicio.getDate());
       

        const eventoFin = new Date(formState.eventoFin);
        const newEventoFin = new Date(eventoInicio.valueOf() + 300000);

        evento.eventoInicio = eventoInicio.toJSON();

        if(eventoFin < eventoInicio) {
            evento.eventoFin = newEventoFin.toJSON();
        }
        
        console.log('inicio>' + evento.eventoInicio + '|fin>' + evento.eventoFin);

        setFormState({...evento});

    }

    function handleOnChangeHoraInicio(e) {
        setFormState({
            ...formState,
            horaInicio: e.target.value,
        })
    }

    function handleOnChangeFechaFin(e) {
        setFormState({
            ...formState,
            fechaFin: e.target.value,
        })
    }

    function handleOnChangeHoraFin(e) {
        setFormState({
            ...formState,
            horaFin: e.target.value,
        })
    }

    function handleOnSubmit() {
        if(validarEvento(formState)) {
            addEvento(formState);
            onSubmit();
            
        } else {
            console.error('Evento invalido');
        }
    }

    return (
        <>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                <input className="form-control form-control-sm" type="text" value={formState.nombre} onChange={handleOnChangeNombre} placeholder="Nombre" aria-label=".form-control-sm example"></input>
                <p style={{color: 'red'}}>Debe ingresar un nombre.</p>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Fecha de inicio</label>
                <input className="form-control form-control-sm" type="date" value={dateToLocaleString(new Date(formState.eventoInicio)).slice(0, 10)} onChange={handleOnChangeFechaInicio} placeholder="Fecha de inicio" aria-label=".form-control-sm example"></input>
                <p style={{color: 'red'}}>Debe ingresar una fecha de inicio.</p>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Hora de inicio</label>
                <input className="form-control form-control-sm" type="time" value={dateToLocaleString(new Date(formState.eventoInicio)).slice(11, 16)} onChange={handleOnChangeHoraInicio} placeholder="Hora de inicio" aria-label=".form-control-sm example"></input>
                <p style={{color: 'red'}}>Debe ingresar una hora de inicio.</p>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Fecha de fin</label>
                <input className="form-control form-control-sm" type="date" value={dateToLocaleString(new Date(formState.eventoFin)).slice(0, 10)} onChange={handleOnChangeFechaFin} placeholder="Fecha de fin" aria-label=".form-control-sm example"></input>
                <p style={{color: 'red'}}>Debe ingresar una fecha de fin.</p>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Hora de fin</label>
                <input className="form-control form-control-sm" type="time" value={dateToLocaleString(new Date(formState.eventoFin)).slice(11, 16)} onChange={handleOnChangeHoraFin} placeholder="Hora de fin" aria-label=".form-control-sm example"></input>
                <p style={{color: 'red'}}>Debe ingresar una hora de fin.</p>
            </div>
            
            <button type="button" className="btn btn-primary" onClick={handleOnSubmit}>Agregar evento</button>
        </>
    )
}