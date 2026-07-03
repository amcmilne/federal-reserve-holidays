import { describe, expect, it } from 'vitest'
import {
  getFederalReserveHolidays,
  getObservedFederalReserveHoliday,
  isFederalReserveHoliday,
} from '../src/index'

const localDateKey = (value: Date): string => {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(
    value.getDate(),
  ).padStart(2, '0')}`
}

describe('federal reserve holidays', () => {
  it('returns 11 holidays for a year', () => {
    const holidays = getFederalReserveHolidays(2026)
    expect(holidays).toHaveLength(11)
  })

  it('keeps Saturday holiday on the same day instead of observing Friday', () => {
    const observed = getObservedFederalReserveHoliday(new Date(2026, 6, 4))
    expect(observed ? localDateKey(observed) : null).toBe('2026-07-04')
  })

  it('returns observed Monday when fixed-date holiday falls on Sunday', () => {
    const observed = getObservedFederalReserveHoliday(new Date(2022, 11, 25))
    expect(observed ? localDateKey(observed) : null).toBe('2022-12-26')
  })

  it('identifies observed Monday holiday dates as bank holidays', () => {
    expect(isFederalReserveHoliday(new Date(2022, 11, 26))).toBe(true)
  })

  it('does not treat Friday as observed when holiday falls on Saturday', () => {
    expect(isFederalReserveHoliday(new Date(2026, 6, 3))).toBe(false)
  })

  it('does not mark a normal business day as a holiday', () => {
    expect(isFederalReserveHoliday(new Date(2026, 6, 2))).toBe(false)
  })
})
