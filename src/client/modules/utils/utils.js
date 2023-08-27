export const dateFormatter = (date) => {
    if(!date) return null;
    let strDate = new Date(date).toString();
    let splittedDate =  strDate.split(' ');
    return `${splittedDate[0]} ${splittedDate[2]}-${splittedDate[1]}-${splittedDate[3]}`;
}