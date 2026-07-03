# @bank/federal-reserve-holidays

Federal Reserve holiday utilities for U.S. banking calendars.

This package is similar in spirit to `@18f/us-federal-holidays`, but specifically targeted at Federal Reserve holidays and observed bank closure dates.

## Install

```bash
npm install @bank/federal-reserve-holidays
```

## API

```ts
import {
  getFederalReserveHolidays,
  getObservedFederalReserveHoliday,
  isFederalReserveHoliday,
} from '@bank/federal-reserve-holidays'

const holidays = getFederalReserveHolidays(2026)
const observed = getObservedFederalReserveHoliday(new Date('2026-07-04'))
const isHoliday = isFederalReserveHoliday(new Date())
```

### getFederalReserveHolidays(year)

Returns the actual holiday dates for the given year.

### getObservedFederalReserveHoliday(date)

Returns the observed bank closure date for a holiday date, or `null` when the provided date is not a Federal Reserve holiday.

### isFederalReserveHoliday(date)

Returns `true` when the given date is an observed Federal Reserve holiday.
