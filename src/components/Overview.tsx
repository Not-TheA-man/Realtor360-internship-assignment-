const stats = [
  { label: 'Active Listing', value: '23', change: '-12%', direction: 'down', symbol: 'home' },
  { label: 'Active Leads', value: '120', change: '+12%', direction: 'up', symbol: 'people' },
  { label: 'Total Closed', value: '42', change: '+12%', direction: 'up', symbol: 'deal' },
  { label: 'Total Revenue', value: 'Rs.22Cr.', change: '+12%', direction: 'up', symbol: 'revenue' },
]

function Overview() {
  return (
    <section className="overview-grid" aria-label="Overview">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <div className="stat-label-row">
            <span className={`stat-icon icon-${stat.symbol}`} aria-hidden="true"><i /></span>
            <h2>{stat.label}</h2>
          </div>
          <div className="stat-value-row">
            <strong>{stat.value}</strong>
            <span className={`stat-change ${stat.direction}`}>{stat.change}<i aria-hidden="true" /></span>
          </div>
        </article>
      ))}
    </section>
  )
}

export default Overview
