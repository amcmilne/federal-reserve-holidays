import {
  FEDERAL_RESERVE_HOLIDAY_NAMES,
  getFederalReserveHolidays,
  getObservedFederalReserveHoliday,
  isFederalReserveHoliday,
} from '@bank/federal-reserve-holidays'
import './App.css'

const formatDate = (value: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(value)
}

function App() {
  const today = new Date()
  const year = today.getFullYear()
  const holidays = getFederalReserveHolidays(year)
  const todayIsHoliday = isFederalReserveHoliday(today)

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Federal Reserve Calendar</p>
        <h1>Bank Holiday Reference</h1>
        <p className="subtitle">
          A small workspace demo using a local npm package built for Federal Reserve holidays.
        </p>

        <div className={`status ${todayIsHoliday ? 'holiday' : 'open'}`}>
          <span className="dot" />
          {todayIsHoliday
            ? 'Today is an observed Federal Reserve holiday.'
            : 'Today is not an observed Federal Reserve holiday.'}
        </div>
      </section>

      <section className="panel">
        <h2>{year} Holidays</h2>
        <ul className="holidayList">
          {holidays.map((holiday, index) => {
            const observed = getObservedFederalReserveHoliday(holiday)
            const observedDiffers = observed && observed.getTime() !== holiday.getTime()

            return (
              <li
                key={`${holiday.getFullYear()}-${holiday.getMonth()}-${holiday.getDate()}`}
                className="holidayItem"
              >
                <div>
                  <p className="holidayName">{FEDERAL_RESERVE_HOLIDAY_NAMES[index]}</p>
                  <p className="holidayDate">{formatDate(holiday)}</p>
                </div>
                {observedDiffers ? (
                  <p className="observed">Observed: {formatDate(observed)}</p>
                ) : (
                  <p className="observed sameDay">Observed: same day</p>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default App
