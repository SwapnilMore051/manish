export const WEEKDAYS = [
    { day: 0, name: 'Sunday', abbr: 'S' },
    { day: 1, name: 'Monday', abbr: 'M' },
    { day: 2, name: 'Tuesday', abbr: 'T' },
    { day: 3, name: 'Wednesday', abbr: 'W' },
    { day: 4, name: 'Thursday', abbr: 'T' },
    { day: 5, name: 'Friday', abbr: 'F' },
    { day: 6, name: 'Saturday', abbr: 'S' },
];
export const DEFAULT_MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export default { EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ };

export const TIME_REGREX = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/;

export const Periods = ['AM', 'PM'];

export const regex24Hr = /^([01]?[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/;
export const regex12Hr = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i;
