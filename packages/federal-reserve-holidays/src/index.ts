export const FEDERAL_RESERVE_HOLIDAY_NAMES = [
  "New Year's Day",
  'Martin Luther King Jr. Day',
  "Washington's Birthday",
  'Memorial Day',
  'Juneteenth National Independence Day',
  'Independence Day',
  'Labor Day',
  'Columbus Day',
  'Veterans Day',
  'Thanksgiving Day',
  'Christmas Day',
] as const

const toDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month, day)
}

const dateKey = (value: Date): string => {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(
    value.getDate(),
  ).padStart(2, '0')}`
}

const nthWeekdayOfMonth = (
  year: number,
  month: number,
  weekday: number,
  nth: number,
): Date => {
  const first = toDate(year, month, 1)
  const firstWeekday = first.getDay()
  const offset = (weekday - firstWeekday + 7) % 7
  return toDate(year, month, 1 + offset + (nth - 1) * 7)
}

const lastWeekdayOfMonth = (year: number, month: number, weekday: number): Date => {
  const last = toDate(year, month + 1, 0)
  const offset = (last.getDay() - weekday + 7) % 7
  return toDate(year, month, last.getDate() - offset)
}

const observedDate = (holiday: Date): Date => {
  const day = holiday.getDay()

  if (day === 0) {
    return toDate(holiday.getFullYear(), holiday.getMonth(), holiday.getDate() + 1)
  }

  return toDate(holiday.getFullYear(), holiday.getMonth(), holiday.getDate())
}

export const getFederalReserveHolidays = (year: number): Date[] => {
  return [
    toDate(year, 0, 1),
    nthWeekdayOfMonth(year, 0, 1, 3),
    nthWeekdayOfMonth(year, 1, 1, 3),
    lastWeekdayOfMonth(year, 4, 1),
    toDate(year, 5, 19),
    toDate(year, 6, 4),
    nthWeekdayOfMonth(year, 8, 1, 1),
    nthWeekdayOfMonth(year, 9, 1, 2),
    toDate(year, 10, 11),
    nthWeekdayOfMonth(year, 10, 4, 4),
    toDate(year, 11, 25),
  ]
}

export const getObservedFederalReserveHoliday = (date: Date): Date | null => {
  const year = date.getFullYear()
  const match = getFederalReserveHolidays(year).find((holiday) => dateKey(holiday) === dateKey(date))

  if (!match) {
    return null
  }

  return observedDate(match)
}

export const isFederalReserveHoliday = (date: Date): boolean => {
  const target = dateKey(date)

  for (const year of [date.getFullYear() - 1, date.getFullYear(), date.getFullYear() + 1]) {
    for (const holiday of getFederalReserveHolidays(year)) {
      if (dateKey(observedDate(holiday)) === target) {
        return true
      }
    }
  }

  return false
}
