import { ReactNode } from 'react'
import styles from './DayView.module.css'


type Color = string

interface TimePeriod {
  label: string
  color: Color
  start: number
  end: number
}

interface HourBlockProps {
  hour: number
  color?: Color
}

interface DayViewProps {
  periods: TimePeriod[]
}

function zeroPad(str: string): string {
  return str.length === 1 ? '0' + str : str
}

function HourBlock(props: HourBlockProps) {
  const { hour, color } = props
  const hourText = zeroPad(hour.toString()) + ':00'
  return (
    <div
      className={styles.hourBlock}
      style={{ backgroundColor: color }}
    >
      {hourText}
    </div>
  )
}

function hourInPeriod(hour: number, period: TimePeriod): boolean {
  return hour >= period.start && hour <= period.end
}

function renderDay(periods: TimePeriod[]): ReactNode {
  const hours = []
  for(let i = 0; i <= 24; i++) {
    const period = periods.find(p => hourInPeriod(i, p))
    if(period) {
      hours.push(
        <HourBlock
          key={i.toString()}
          hour={i}
          color={period.color}
        />
      )
    } else {
      hours.push(
        <HourBlock
          key={i.toString()}
          hour={i} 
        />
      )
    }
  }
  return hours
}

function DayView(props: DayViewProps) {
  const { periods } = props
  const content = renderDay(periods)
  return (
    <div>
      {content}
    </div>
  )
}

export {
  DayView
}