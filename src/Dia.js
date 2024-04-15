import Evento from './Evento.js';
import { useHoy } from './context/HoyContext.js';

export default function Dia({ eventos, dia }) {
    const hoy = useHoy();
    console.log(hoy);
    let nombreDia = 'Hoy ';
    if(hoy.getMonth() === dia.getMonth() && hoy.getDate() - 1 === dia.getDate() && hoy.getFullYear() === dia.getFullYear()){
        nombreDia = 'Ayer '
    } else if (hoy.getMonth() === dia.getMonth() && hoy.getDate() - 1 > dia.getDate() && hoy.getFullYear() === dia.getFullYear()){
        nombreDia = ''
    } else if (hoy.getMonth() === dia.getMonth() && hoy.getDate() + 1 === dia.getDate() && hoy.getFullYear() === dia.getFullYear()){
        nombreDia = 'Mañana '
    }

    return (
        <div>
            <h3>{nombreDia}{dia.getDate()}/{dia.getMonth() + 1}/{dia.getFullYear()}</h3>
            {eventos.map( ev => {
                return (
                    <Evento key={ev.id} data={ev} />
                )
            })}
        </div>
    );
}