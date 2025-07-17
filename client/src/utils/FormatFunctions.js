import dayjs from "dayjs"

// Format iso date to readable format
export const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM D, YYYY");
}

// Format campsite names from camelcase to uppercase with spaces
export const formatString = (camelCaseString) => {
    const formatted = camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');
    return formatted.replace(/\b\w/g, char => char.toUpperCase())
}