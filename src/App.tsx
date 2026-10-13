import { useState } from 'react'
import Navbar from './components/Navbar'
import Overview from './components/Overview'
import Analytics from './components/Analytics'
import Listings from './components/Listings'
import DashboardSidebar from './components/DashboardSidebar'
import './styles/global.css'
import './styles/dashboard.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="dashboard">
        <div className="dashboard-main">
          <Overview />
          <Analytics />
          <Listings searchQuery={searchQuery} />
        </div>
        <DashboardSidebar searchQuery={searchQuery} />
      </main>
    </>
  )
}

export default App
