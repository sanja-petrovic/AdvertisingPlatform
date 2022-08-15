import {convertDate} from "./convertDate";
export const formatDate = (date) => {
    if (date !== null) {
        const convertedDate = convertDate(date);
        return convertedDate.toLocaleString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return "";
}