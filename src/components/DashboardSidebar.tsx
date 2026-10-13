import { useState } from 'react'
import johnDoe from '../assets/john-doe.png'
import jessicaChen from '../assets/jessica-chen.png'
import evanChris from '../assets/evan-chris.png'
import jackB from '../assets/jack-b.png'

const followUpImages = [johnDoe, jessicaChen, evanChris, jackB]
const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const scheduleItems = [
  { title: 'Visit Client- Angel Plaza', detail: 'Sector 45, Gurugram, Haryana', color: 'mint' },
  { title: 'Visit Client – Site Walkthrough', detail: 'Whitefield Road, Bengaluru, Karnataka', color: 'mint' },
  { title: 'Follow Up – Jessica Chen', detail: 'jessica.chen@email.com', color: 'pink' },
  { title: 'Follow Up – Roger Bouchard', detail: 'roger.bouchard@clientmail.com', color: 'pink' },
  { title: 'Submit Final Offer – Villa Deal', detail: 'Finalize and send offer documents.', color: 'gold' },
  { title: 'Submit Internal Review – Apartment Pricing', detail: 'Update CRM with latest market rates.', color: 'gold' },
]

function Reminder({ searchQuery }: { searchQuery: string }) {
  const query = searchQuery.trim().toLowerCase()
  const showFollowUps = !query || 'follow-ups 15 leads need to be followed up'.includes(query)
  const reminderItems = [
    { title: 'Submit Final Offer- Villa Deal', detail: 'Finalize and send offer documents.' },
    { title: 'Review Contract with Legal', detail: 'Ensure attorney reviews apartment deal contract today.' },
    { title: 'Call Jessica Chen – Follow-up', detail: 'Discuss her feedback after site visit to Angel Plaza.' },
  ].filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(query))

  return (
    <section className="side-panel reminder-panel" aria-labelledby="reminder-heading">
      <h2 id="reminder-heading">Reminder</h2>
      {showFollowUps && (
        <div className="follow-up-card">
          <strong>Follow-Ups</strong>
          <span>15 leads need to be followed up.</span>
          <div className="follow-up-avatars" aria-label="15 leads">
            {followUpImages.map((image, index) => <img src={image} alt="" key={index} />)}
            <b>+11</b>
          </div>
        </div>
      )}
      <div className="reminder-list">
        {reminderItems.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>)}
        {query && reminderItems.length === 0 && !showFollowUps && <p className="search-empty">No reminders match that search.</p>}
      </div>
    </section>
  )
}

function Calendar() {
  const [month, setMonth] = useState(new Date(2025, 6, 1))
  const [selectedDay, setSelectedDay] = useState(8)
  const monthName = month.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const startDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const dayCount = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cellCount = Math.ceil((startDay + dayCount) / 7) * 7
  const days = Array.from({ length: cellCount }, (_, index) => {
    const day = index - startDay + 1
    return day > 0 && day <= dayCount ? day : null
  })
  const julyMarks: Record<number, string> = { 9: 'mint', 10: 'gold', 14: 'pink' }

  function changeMonth(amount: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1))
    setSelectedDay(1)
  }

  return (
    <section className="side-panel calendar-panel" aria-label="Calendar">
      <div className="calendar-heading">
        <h2>{monthName}</h2>
        <div>
          <button className="month-arrow previous" type="button" aria-label="Previous month" onClick={() => changeMonth(-1)} />
          <button className="month-arrow next" type="button" aria-label="Next month" onClick={() => changeMonth(1)} />
        </div>
      </div>
      <div className="calendar-grid">
        {weekdays.map((day, index) => <span className="weekday" key={`${day}-${index}`}>{day}</span>)}
        {days.map((day, index) => {
          if (day === null) return <span className="calendar-empty" key={`empty-${index}`} />
          const isJuly = month.getFullYear() === 2025 && month.getMonth() === 6
          const marker = isJuly ? julyMarks[day] : ''
          const selected = selectedDay === day
          return (
            <button className={`calendar-day ${selected ? 'selected' : ''} ${marker ? `marked ${marker}` : ''}`} type="button" key={day} aria-pressed={selected} onClick={() => setSelectedDay(day)}>
              {day}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function MySchedule({ searchQuery }: { searchQuery: string }) {
  const query = searchQuery.trim().toLowerCase()
  const filteredItems = scheduleItems.filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(query))

  return (
    <section className="side-panel schedule-panel" aria-labelledby="schedule-heading">
      <h2 id="schedule-heading">My Schedule</h2>
      <div className="schedule-list">
        {filteredItems.map((item) => (
          <article className={`schedule-item ${item.color}`} key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
        {query && filteredItems.length === 0 && <p className="search-empty">No schedule items match that search.</p>}
      </div>
    </section>
  )
}

function DashboardSidebar({ searchQuery }: { searchQuery: string }) {
  return (
    <aside className="dashboard-sidebar" aria-label="Reminders and schedule">
      <Reminder searchQuery={searchQuery} />
      <Calendar />
      <MySchedule searchQuery={searchQuery} />
    </aside>
  )
}

export default DashboardSidebar
