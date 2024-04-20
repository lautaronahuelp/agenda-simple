export function cropDate(date){
    if(date.length > 10){
        //YYYYY-MM-DD
        return date.slice(1, 11);
    } else {
        return date;
    }
}

export function dateToLocaleString(date,){
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    //YYYY-MM-DDTHH:MM
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function parseHTMLDate(date,){
    const year = parseInt(date.slice(0, 4));
    const month = parseInt(date.slice(5, 7));
    const day = parseInt(date.slice(8, 11));
    console.log(`INSIDE HTMLPARSE${year}-${month}-${day}`);
    return [year, month, day]
}

export function parseHTMLTime(time,){
    //YYYY-MM-DDTHH:MM:SSZ
    const hours = parseInt(time.slice(0, 2));
    const minutes = parseInt(time.slice(3, 5));

    return [hours, minutes]
}

export function calculateEndDatetime(evento, eventoInicio, formState){
        const eventoFin = new Date(formState.eventoFin);
        const newEventoFin = new Date(eventoInicio.valueOf() + 300000);


        if(eventoInicio.toJSON() !== null) {
            evento.eventoInicio = eventoInicio.toJSON();
        }

        if(eventoFin < eventoInicio) {
            evento.eventoFin = newEventoFin.toJSON();
        }
}

export function calculateStartDatetime(evento, eventoFin, formState){
    const eventoInicio = new Date(formState.eventoInicio);
    const newEventoInicio = new Date(eventoFin.valueOf() - 300000);

    
    if(eventoFin.toJSON() !== null) {
        evento.eventoFin = eventoFin.toJSON();
    }

    if(eventoInicio > eventoFin) {
        evento.eventoInicio = newEventoInicio.toJSON();
    }
}