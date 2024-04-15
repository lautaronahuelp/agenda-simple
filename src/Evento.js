export default function Evento( { data } ) {
    const horaInicio = new Date(data.eventoInicio);
    const horaFin = new Date(data.eventoFin);


    function strFechaHora(date) {
        const [month, day, year] = [
            date.getMonth(),
            date.getDate(),
            date.getFullYear(),
        ];
        const [hour, minutes, seconds] = [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        ];

        return day + '/' + month + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds;
    }

    return(
        <div className="card text-bg-primary mb-3"  style={{width: 18 + 'rem', height: 10 + 'rem'}}>
            <div className="card-header">{ horaInicio.toLocaleString("en-GB") } a { horaFin.toLocaleString("en-GB") } // {data.horaInicio} a {data.horaFin}<button type="button" className="btn btn-primary btn-sm"><i className="bi bi-pencil-square"></i></button></div>
                <div className="card-body">
                    <h5 className="card-title">{data.nombre}</h5>
                </div>
        </div>
    )

}