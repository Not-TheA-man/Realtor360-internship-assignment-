import { useEffect, useState, type FormEvent } from 'react'
import maplewoodHouse from '../assets/maplewood-house.jpg'
import serenityVilla from '../assets/serenity-villa.jpg'
import rosehillCottage from '../assets/rosehill-cottage.jpg'
import skylineEdge from '../assets/skyline-edge.jpg'
import johnDoe from '../assets/john-doe.png'
import jessicaChen from '../assets/jessica-chen.png'
import evanChris from '../assets/evan-chris.png'
import jackB from '../assets/jack-b.png'
import emilyParis from '../assets/emily-paris.png'

interface Lead {
  name: string
  location: string
  initials: string
  image: string
  email: string
  phone: string
  address: string
}

interface PropertyListing {
  name: string
  type: string
  units: string
  price: string
  leads: number
  views: string
  status: string
  tone: string
  image: string
  address: string
  occupied: number
  available: number
  description: string
}

const properties = [
  { name: 'Maplewood House', type: 'House', units: '12', price: 'Rs.85L', leads: 35, views: '125', status: '8/12 Occupied', tone: 'green', image: maplewoodHouse, address: '42 Maplewood Avenue, Brooklyn, New York', occupied: 8, available: 4, description: 'Sunlit family home with a renovated kitchen and a private garden, close to neighborhood parks and transit.' },
  { name: 'Serenity Villa', type: 'Villa', units: '9300', price: 'Rs.2.8Cr', leads: 40, views: '930', status: 'Available', tone: 'green', image: serenityVilla, address: '18 Palm Grove Road, Beverly Hills, California', occupied: 0, available: 9300, description: 'Contemporary poolside villa with bright open living spaces, a landscaped garden, and room for entertaining.' },
  { name: 'Rosehill Cottage', type: 'House', units: '25', price: 'Rs.1.1Cr', leads: 15, views: '355', status: 'Available', tone: 'green', image: rosehillCottage, address: '7 Rosehill Lane, Portland, Oregon', occupied: 0, available: 25, description: 'Quiet cottage with warm wood interiors, a pitched roof, and a private outdoor deck.' },
  { name: 'Skyline Edge', type: 'Apartment', units: '17', price: 'Rs.75L', leads: 11, views: '425', status: 'Sold Out', tone: 'red', image: skylineEdge, address: '220 Skyline Boulevard, Columbus, Ohio', occupied: 17, available: 0, description: 'Modern high-rise apartments with city views, secure entry, and easy access to downtown.' },
] satisfies PropertyListing[]

const emptyListing = {
  name: '',
  type: 'Apartment',
  units: '',
  price: '',
  leads: '0',
  address: '',
  occupied: '0',
  description: '',
  image: maplewoodHouse,
}

const leads: Lead[] = [
  { name: 'John Doe', location: 'New York', initials: 'JD', image: johnDoe, email: 'john.doe@email.com', phone: '+1 (212) 555-0148', address: '125 Madison Ave, New York, NY 10016' },
  { name: 'Jessica Chen', location: 'California, LA', initials: 'JC', image: jessicaChen, email: 'jessica.chen@email.com', phone: '+1 (310) 555-0164', address: '8400 Sunset Blvd, Los Angeles, CA 90069' },
  { name: 'Evan Chris', location: 'New York', initials: 'EC', image: evanChris, email: 'evan.chris@email.com', phone: '+1 (212) 555-0191', address: '350 Fifth Ave, New York, NY 10118' },
  { name: 'Jack B.', location: 'Ohio, Columbus', initials: 'JB', image: jackB, email: 'jack.b@email.com', phone: '+1 (614) 555-0137', address: '41 S High St, Columbus, OH 43215' },
  { name: 'Emily Paris', location: 'California, LA', initials: 'EP', image: emilyParis, email: 'emily.paris@email.com', phone: '+1 (323) 555-0185', address: '6400 Wilshire Blvd, Los Angeles, CA 90048' },
]

function Listings({ searchQuery }: { searchQuery: string }) {
  const [listingData, setListingData] = useState<PropertyListing[]>(properties)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [selectedListing, setSelectedListing] = useState<PropertyListing | null>(null)
  const [addListingOpen, setAddListingOpen] = useState(false)
  const [listingDraft, setListingDraft] = useState(emptyListing)
  const [listingError, setListingError] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterText, setFilterText] = useState('')
  const [listingFilterOpen, setListingFilterOpen] = useState(false)
  const [listingQuery, setListingQuery] = useState('')
  const filteredProperties = listingData.filter((property) =>
    `${property.name} ${property.type} ${property.address} ${property.price} ${property.status} ${property.description}`.toLowerCase().includes(listingQuery.trim().toLowerCase())
      && `${property.name} ${property.type} ${property.address} ${property.price} ${property.status} ${property.description}`.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  )
  const filteredLeads = leads.filter((lead) =>
    `${lead.name} ${lead.location} ${lead.email} ${lead.phone} ${lead.address}`.toLowerCase().includes(filterText.trim().toLowerCase())
      && `${lead.name} ${lead.location} ${lead.email} ${lead.phone} ${lead.address}`.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  )

  useEffect(() => {
    if (!selectedLead && !selectedListing && !addListingOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedLead(null)
        setSelectedListing(null)
        setAddListingOpen(false)
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [selectedLead, selectedListing, addListingOpen])

  function addListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const totalUnits = Number(listingDraft.units)
    const occupied = Number(listingDraft.occupied)
    const nameExists = listingData.some((property) => property.name.toLowerCase() === listingDraft.name.trim().toLowerCase())

    if (nameExists) {
      setListingError('A listing with this name already exists.')
      return
    }
    if (occupied > totalUnits) {
      setListingError('Occupied units cannot exceed total units.')
      return
    }

    const available = totalUnits - occupied
    const newProperty: PropertyListing = {
      name: listingDraft.name.trim(),
      type: listingDraft.type,
      units: String(totalUnits),
      price: listingDraft.price.trim(),
      leads: Number(listingDraft.leads),
      views: '0',
      status: available === 0 ? 'Sold Out' : occupied === 0 ? 'Available' : `${occupied}/${totalUnits} Occupied`,
      tone: available === 0 ? 'red' : 'green',
      image: listingDraft.image,
      address: listingDraft.address.trim(),
      occupied,
      available,
      description: listingDraft.description.trim(),
    }

    setListingData((current) => [...current, newProperty])
    setListingDraft(emptyListing)
    setListingError('')
    setAddListingOpen(false)
  }

  return (
    <>
      <section className="bottom-grid" aria-label="Active listings and contacts">
        <article className="panel listing-panel">
          <div className="panel-heading"><h2>Active Listing</h2><div className="listing-actions"><button className="add-listing-button" type="button" aria-label="Add new listing" onClick={() => { setListingError(''); setAddListingOpen(true) }}><span /></button><button className="view-all" type="button" aria-expanded={listingFilterOpen} onClick={() => setListingFilterOpen((open) => !open)}>View all <span aria-hidden="true">→</span></button></div></div>
          {listingFilterOpen && <input className="contact-filter listing-filter" type="search" aria-label="Filter active listings" placeholder="Search property, address or description" value={listingQuery} onChange={(event) => setListingQuery(event.target.value)} />}
          <div className="table-scroll">
            <table className="listing-table">
              <thead><tr><th>Property</th><th>Type</th><th>Units</th><th>Price</th><th>Active Leads</th><th>Views</th><th>Status</th></tr></thead>
              <tbody>
                {filteredProperties.map((property, index) => (
                  <tr key={property.name}>
                    <td><button className="property-open-button" type="button" aria-label={`View details for ${property.name}`} onClick={() => setSelectedListing(property)}><img className="property-thumb" src={property.image} alt="" /><span className="property-name">{property.name}</span></button></td>
                    <td>{property.type}</td><td>{property.units}</td><td>{property.price}</td>
                    <td><span className="lead-avatars"><img src={leads[index % leads.length].image} alt={`${leads[index % leads.length].name} lead`} /><img src={leads[(index + 1) % leads.length].image} alt={`${leads[(index + 1) % leads.length].name} lead`} /><b>+{property.leads}</b></span></td>
                    <td>{property.views}</td><td><span className={`status status-${property.tone}`}>{property.status}</span></td>
                  </tr>
                ))}
                {filteredProperties.length === 0 && <tr><td className="listing-empty" colSpan={7}>No listings match that search.</td></tr>}
              </tbody>
            </table>
          </div>
        </article>
        <article className="panel contacts-panel">
          <div className="panel-heading">
            <h2>Leads Contacts</h2>
            <button className="more-button" type="button" aria-label="Filter contacts" aria-expanded={filterOpen} onClick={() => setFilterOpen((open) => !open)}><span /></button>
          </div>
          {filterOpen && <input className="contact-filter" type="search" aria-label="Filter contacts" placeholder="Search name, email, phone or address" value={filterText} onChange={(event) => setFilterText(event.target.value)} />}
          <ul className="contact-list">
            {filteredLeads.map((lead) => (
              <li key={lead.name}>
                <button className="contact-trigger" type="button" onClick={() => setSelectedLead(lead)}>
                  <img className="contact-avatar" src={lead.image} alt="" />
                  <span className="contact-details"><strong>{lead.name}</strong><small>{lead.location}</small></span>
                </button>
              </li>
            ))}
            {filteredLeads.length === 0 && <li className="contact-empty">No contacts match that search.</li>}
          </ul>
        </article>
      </section>
      {selectedLead && (
        <div className="contact-modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setSelectedLead(null) }}>
          <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-name">
            <button className="contact-modal-close" type="button" aria-label="Close contact details" onClick={() => setSelectedLead(null)}>×</button>
            <img className="contact-modal-image" src={selectedLead.image} alt={`Portrait of ${selectedLead.name}`} />
            <div className="contact-modal-content">
              <h2 id="contact-modal-name">{selectedLead.name}</h2>
              <p className="contact-modal-location">{selectedLead.location}</p>
              <dl>
                <div><dt>Email</dt><dd><a href={`mailto:${selectedLead.email}`}>{selectedLead.email}</a></dd></div>
                <div><dt>Phone</dt><dd><a href={`tel:${selectedLead.phone.replaceAll(/[ ()-]/g, '')}`}>{selectedLead.phone}</a></dd></div>
                <div><dt>Address</dt><dd>{selectedLead.address}</dd></div>
              </dl>
            </div>
          </section>
        </div>
      )}
      {selectedListing && (
        <div className="contact-modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setSelectedListing(null) }}>
          <section className="property-modal" role="dialog" aria-modal="true" aria-labelledby="property-modal-name">
            <button className="contact-modal-close" type="button" aria-label="Close property details" onClick={() => setSelectedListing(null)}>×</button>
            <img className="property-modal-image" src={selectedListing.image} alt={`${selectedListing.name} property`} />
            <div className="property-modal-content">
              <div className="property-modal-title"><div><h2 id="property-modal-name">{selectedListing.name}</h2><p>{selectedListing.type}</p></div><span className={`status status-${selectedListing.tone}`}>{selectedListing.status}</span></div>
              <p className="property-modal-address">{selectedListing.address}</p>
              <div className="property-stats">
                <div><span>Price</span><strong>{selectedListing.price}</strong></div>
                <div><span>Occupied</span><strong>{selectedListing.occupied} / {selectedListing.units}</strong></div>
                <div><span>Units left</span><strong>{selectedListing.available}</strong></div>
                <div><span>Active leads</span><strong>{selectedListing.leads}</strong></div>
              </div>
              <div className="property-description"><h3>Description</h3><p>{selectedListing.description}</p></div>
            </div>
          </section>
        </div>
      )}
      {addListingOpen && (
        <div className="contact-modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setAddListingOpen(false) }}>
          <section className="add-listing-modal" role="dialog" aria-modal="true" aria-labelledby="add-listing-title">
            <button className="contact-modal-close" type="button" aria-label="Close new listing form" onClick={() => setAddListingOpen(false)}>×</button>
            <h2 id="add-listing-title">Add New Listing</h2>
            <form className="add-listing-form" onSubmit={addListing}>
              <label>Property name<input required value={listingDraft.name} onChange={(event) => setListingDraft({ ...listingDraft, name: event.target.value })} /></label>
              <label>Property type<select value={listingDraft.type} onChange={(event) => setListingDraft({ ...listingDraft, type: event.target.value })}><option>Apartment</option><option>House</option><option>Villa</option><option>Commercial</option></select></label>
              <label>Total units<input required type="number" min="1" step="1" value={listingDraft.units} onChange={(event) => setListingDraft({ ...listingDraft, units: event.target.value })} /></label>
              <label>Occupied units<input required type="number" min="0" step="1" value={listingDraft.occupied} onChange={(event) => setListingDraft({ ...listingDraft, occupied: event.target.value })} /></label>
              <label>Price<input required placeholder="Rs.85L" value={listingDraft.price} onChange={(event) => setListingDraft({ ...listingDraft, price: event.target.value })} /></label>
              <label>Active leads<input required type="number" min="0" step="1" value={listingDraft.leads} onChange={(event) => setListingDraft({ ...listingDraft, leads: event.target.value })} /></label>
              <label className="listing-form-wide">Address<input required value={listingDraft.address} onChange={(event) => setListingDraft({ ...listingDraft, address: event.target.value })} /></label>
              <label>Property photo<select value={listingDraft.image} onChange={(event) => setListingDraft({ ...listingDraft, image: event.target.value })}><option value={maplewoodHouse}>Maplewood House</option><option value={serenityVilla}>Serenity Villa</option><option value={rosehillCottage}>Rosehill Cottage</option><option value={skylineEdge}>Skyline Edge</option></select></label>
              <label className="listing-form-wide">Description<textarea required rows={3} value={listingDraft.description} onChange={(event) => setListingDraft({ ...listingDraft, description: event.target.value })} /></label>
              {listingError && <p className="listing-form-error" role="alert">{listingError}</p>}
              <div className="listing-form-actions"><button className="listing-cancel" type="button" onClick={() => setAddListingOpen(false)}>Cancel</button><button className="listing-submit" type="submit">Add Listing</button></div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}

export default Listings
