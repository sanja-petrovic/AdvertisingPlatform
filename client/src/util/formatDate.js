export const formatDate = (date) => {
    if (date !== null) {
        const dateAndTime = date.split('T');
        const dateParts = dateAndTime[0].split('-');
        const timeParts = dateAndTime[1].split(':');
        const formattedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1]);
        return formattedDate.toLocaleString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return "";
}