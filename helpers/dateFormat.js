const formatDate = (date) => {
    if (!date) return null; // Handle cases where date is null or undefined

    const fullDate = new Date(date); // Ensure date is a Date object
    const year = String(fullDate.getFullYear());
    const day = String(fullDate.getDate()).padStart(2, '0'); // Pad day with leading zero if needed
    const month = String(fullDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, pad month with leading zero

    return `${month}/${day}/${year}`;
};


module.exports = {formatDate}