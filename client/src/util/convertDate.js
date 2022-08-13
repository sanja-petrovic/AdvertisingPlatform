export const convertDate = (date) => {
    if (date !== null) {
        const dateAndTime = date.split('T');
        const dateParts = dateAndTime[0].split('-');
        const timeParts = dateAndTime[1].split(':');
        const convertedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1]);
        return convertedDate;
    }

    return "";
}