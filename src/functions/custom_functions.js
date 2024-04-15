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

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function parseHTMLDate(date,){
    const year = parseInt(date.slice(0, 4));
    const month = parseInt(date.slice(5, 7));
    const day = parseInt(date.slice(8, 11));
    return [year, month, day]
}

export function parseHTMLTime(time,){
    const hours = parseInt(time.slice(0, 4));
    const minutes = parseInt(time.slice(5, 7));

    return [hours, minutes]
}