import { useState } from "react";
import { useEventosValidate, useEventosSet} from "./context/EventosContext";
import { cropDate, dateToLocaleString, parseHTMLDate, parseHTMLTime, calculateEndDatetime,calculateStartDatetime } from "./functions/custom_functions";

export default function FormEvento({eventoInicial, error, onSubmit}) {
    const [formState, setFormState] = useState(eventoInicial);
    const validarEvento = useEventosValidate();
    const addEvento = useEventosSet();
    console.log(formState);

    //TEMA NO PUEDE DURAR MENOS DE UN MINUTO. TEMA NO PUEDE DURAR MAS DE 24HS

    //HANDLES
    function handleOnChangeNombre(e) {
        
        setFormState({
            ...formState,
            nombre: e.target.value,
        })
    }

    function handleOnChangeFechaInicio(e) {
        const evento = {...formState};
        //'0001-01-01T00:00:00.000Z'
        //console.log("new fecha inicio: ");
        //console.log(e.target.value);
        const [ year, month, day ] = parseHTMLDate(e.target.value);

        const eventoInicio = new Date(formState.eventoInicio);
        eventoInicio.setFullYear(year);
        eventoInicio.setMonth(month - 1);
        eventoInicio.setDate(day);
       
        calculateEndDatetime(evento, eventoInicio, formState);
        
        //console.log('inicio>' + evento.eventoInicio + '|fin>' + evento.eventoFin);

        setFormState({...evento});

    }

    function handleOnChangeHoraInicio(e) {
        const evento = {...formState};
        const [ hours, minutes ] = parseHTMLTime(e.target.value);

        const eventoInicio = new Date(formState.eventoInicio);
        eventoInicio.setHours(hours);
        eventoInicio.setMinutes(minutes);

        calculateEndDatetime(evento, eventoInicio, formState);

        setFormState({...evento});

    }

    function handleOnChangeFechaFin(e) {
        const evento = {...formState};
        //'0001-01-01T00:00:00.000Z'
        //console.log("new fecha inicio: ");
        //console.log(e.target.value);
        const [ year, month, day ] = parseHTMLDate(e.target.value);

        const eventoFin = new Date(formState.eventoFin);
        eventoFin.setFullYear(year);
        eventoFin.setMonth(month - 1);
        eventoFin.setDate(day);
       
        calculateStartDatetime(evento, eventoFin, formState);
        
        //console.log('inicio>' + evento.eventoInicio + '|fin>' + evento.eventoFin);

        setFormState({...evento});
    }

    function handleOnChangeHoraFin(e) {
        const evento = {...formState};
        const [ hours, minutes ] = parseHTMLTime(e.target.value);

        const eventoFin = new Date(formState.eventoFin);
        eventoFin.setHours(hours);
        eventoFin.setMinutes(minutes);

        calculateStartDatetime(evento, eventoFin, formState);

        setFormState({...evento});
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