export const now = () => moment().format('YYYY-MM-DD HH:mm:ss')
export const zero = () => '0000-00-00 00:00:00'
export const thisDay = () => moment().format('YYYY-MM-DD')
export const thisWeek = () => moment().startOf('week').format('YYYY-MM-DD')
export const thisMonth = () => moment().startOf('month').format('YYYY-MM-DD')
export const thisQuarter = () => moment().startOf('quarter').format('YYYY-MM-DD')
export const thisYear = () => moment().startOf('year').format('YYYY-MM-DD')
export const birthdayFromAge = age => moment({ month: 0, day: 1 }).subtract(age, 'years').format('YYYY-MM-DD')
export const ageFromBirthday = birthday => moment().diff(birthday, 'years')