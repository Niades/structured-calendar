import { ReactNode } from 'react'
import styles from './DayView.module.css'


type Color = string
type Time = number

const HOUR_BLOCK_HEIGHT_PX = 60

interface TimePeriod {
  start: Time
  end: Time
}

interface CalendarPeriod {
  label: string
  color: Color
  time: TimePeriod
}

interface Event {
  label: string
  time: TimePeriod
}

interface HourBlockProps {
  hour: number
  color?: Color
}

interface DayViewProps {
  periods: CalendarPeriod[]
  events: Event[]
}

interface EventBlockProps {
  label: string
  time: TimePeriod
}

function EventBlock(props: EventBlockProps) {
  const { label, time } = props
  const length = time.end - time.start
  return (
    <div
      className={styles.eventBlock}
      style={{
        top: time.start * HOUR_BLOCK_HEIGHT_PX,
        height: length * HOUR_BLOCK_HEIGHT_PX
      }}
    >
      {label}
    </div>
  )
}

function zeroPad(str: string): string {
  return str.length === 1 ? '0' + str : str
}

function hourInPeriod(hour: number, period: CalendarPeriod): boolean {
  return hour >= period.time.start && hour <= period.time.end
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

function renderDay(periods: CalendarPeriod[], events: Event[]): ReactNode {
  const content = []
  for(let i = 0; i <= 24; i++) {
    const period = periods.find(p => hourInPeriod(i, p))
    if(period) {
      content.push(
        <HourBlock
          key={i.toString()}
          hour={i}
          color={period.color}
        />
      )
    } else {
      content.push(
        <HourBlock
          key={i.toString()}
          hour={i} 
        />
      )
    }
  }
  events.forEach((e) => content.push(
    <EventBlock label={e.label} time={e.time} />
  ))
  return content
}

function DayView(props: DayViewProps) {
  const { periods, events } = props
  const content = renderDay(periods, events)
  return (
    <div>
      {content}
    </div>
  )
}

export {
  DayView
}