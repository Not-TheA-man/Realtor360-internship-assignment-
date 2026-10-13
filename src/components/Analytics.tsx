const stageNames = ['Interested', 'Site Visit Done', 'Unit Shortlisted', 'Contract Signed', 'Offer Initiated', 'Offer Accepted']
const stageHeights = [7.5, 9.4, 8.7, 9.5, 7.8, 9.5]
const ownerValues = [[5.1, 6.2, 6.6], [2.4, 5.4, 4.2]]

function Legend() {
  return (
    <div className="legend">
      <span><i className="legend-plaza" />Angel Plaza</span>
      <span><i className="legend-garden" />Angel Garden</span>
      <span><i className="legend-none" />None</span>
    </div>
  )
}

function LeadSource() {
  return (
    <article className="panel source-panel">
      <h2>Deals by Lead Source</h2>
      <div className="donut-wrap">
        <div className="source-label label-website"><span>Website</span><strong>10 (24.83%)</strong></div>
        <div className="source-label label-inbound"><span>Inbound Call</span><strong>9 (37.87%)</strong></div>
        <svg className="callout-arrows" viewBox="0 0 600 306" aria-hidden="true" focusable="false">
          <defs>
            <marker id="callout-tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M1 1 8 5 1 9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </marker>
          </defs>
          <path d="M211 84 C181 61 157 63 126 82" />
          <path d="M389 82 C417 61 442 62 476 80" />
          <path d="M211 207 C182 233 156 239 126 228" />
          <path d="M390 207 C418 231 445 238 477 226" />
        </svg>
        <svg className="donut-chart" viewBox="0 0 260 260" role="img" aria-label="Deals by lead source">
          <circle className="donut-track" cx="130" cy="130" r="84" />
          <circle className="donut-segment segment-website" cx="130" cy="130" r="84" />
          <circle className="donut-segment segment-inbound" cx="130" cy="130" r="84" />
          <circle className="donut-segment segment-reference" cx="130" cy="130" r="84" />
          <circle className="donut-segment segment-facebook" cx="130" cy="130" r="84" />
          <circle className="donut-center" cx="130" cy="130" r="46" />
        </svg>
        <div className="source-label label-facebook"><span>Facebook</span><strong>1 (6.78%)</strong></div>
        <div className="source-label label-reference"><span>Reference</span><strong>1 (30.6%)</strong></div>
      </div>
    </article>
  )
}

function StageChart() {
  return (
    <article className="panel stage-panel">
      <h2>Deals by Stages by Development</h2>
      <div className="stage-chart">
        <span className="axis-title y-axis-title">Record Count</span>
        <div className="stage-chart-content">
          <div className="y-ticks"><span>10</span><span>7.5</span><span>5</span><span>2.5</span><span>0</span></div>
          <div className="stage-plot">
            {[0, 25, 50, 75, 100].map((tick) => <i className="grid-line" key={tick} style={{ bottom: `${tick}%` }} />)}
            <div className="stage-bars">
              {stageNames.map((name, index) => (
                <div className="stage-column" key={name}>
                  <div className="stage-bar" style={{ height: `${stageHeights[index] * 10}%` }}>
                    <i className="bar-plaza" style={{ height: '39%' }} />
                    <i className="bar-garden" style={{ height: '34%' }} />
                    <i className="bar-none" />
                  </div>
                  <span className="stage-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="axis-title x-axis-title">Stage</span>
      </div>
      <Legend />
    </article>
  )
}

function SalesChart() {
  return (
    <article className="panel sales-panel">
      <h2>Deals by Sales People by Development</h2>
      <div className="sales-chart">
        <span className="axis-title sales-y-title">Deal Owner</span>
        <div className="sales-plot">
          <div className="sales-bars">
            {ownerValues.map((values, index) => (
              <div className="sales-row" key={index}>
                {values.map((value, segment) => <i className={`sales-segment segment-${segment + 1}`} key={segment} style={{ width: `${(value / 20) * 100}%` }} />)}
              </div>
            ))}
          </div>
          <div className="sales-ticks">{[0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20].map((tick) => <span key={tick}>{tick}</span>)}</div>
          <span className="axis-title sales-x-title">Record Count</span>
        </div>
      </div>
      <Legend />
    </article>
  )
}

function Pipeline() {
  return (
    <article className="panel pipeline-panel">
      <h2>Deals in Pipeline by Development</h2>
      <table className="pipeline-table">
        <thead><tr><th>Development Name</th><th>Record Count</th></tr></thead>
        <tbody>
          <tr><td>None</td><td>20</td></tr>
          <tr><td>Angel Plaza</td><td>14</td></tr>
          <tr><td>Angel Garden</td><td>11</td></tr>
        </tbody>
      </table>
    </article>
  )
}

function ClosedDeals() {
  return (
    <article className="panel closed-panel">
      <h2>Total Deals Closed</h2>
      <div className="progress-track"><span className="progress-fill" /><i className="progress-marker" /></div>
      <div className="progress-labels"><span><strong>42</strong> Closed Deals</span><span><strong>132</strong> On Progress</span></div>
    </article>
  )
}

function Analytics() {
  return (
    <section className="analytics-grid" aria-label="Deal analytics">
      <LeadSource />
      <StageChart />
      <SalesChart />
      <Pipeline />
      <ClosedDeals />
    </section>
  )
}

export default Analytics
