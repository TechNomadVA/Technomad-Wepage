import React, { useState, useEffect, Suspense, lazy } from 'react'
import BackgroundEffects from '../components/BackgroundEffects'
import Footer from '../components/Footer'

// Lazy load heavy Three.js components
const NeuralBackground = lazy(() => import('../components/NeuralBackground'))
const HelixBackground = lazy(() => import('../components/HelixBackground'))

const Admin = () => {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState({ page: 1, limit: 100, total: 0, totalPages: 0 })

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async (page = 1) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/subscribers?page=${page}&limit=100`)
      if (!response.ok) {
        throw new Error('Failed to fetch subscribers')
      }
      const data = await response.json()
      setSubscribers(data.subscribers || [])
      setPagination(data.pagination || {})
    } catch (err) {
      setError(err.message)
      console.error('Error fetching subscribers:', err)
    } finally {
      setLoading(false)
    }
  }

  const exportCSV = () => {
    const headers = ['Email', 'Subscribed At', 'Source']
    const rows = subscribers.map(sub => [
      sub.email,
      sub.subscribed_at,
      sub.source || 'website'
    ])
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `technomad-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <BackgroundEffects />
      <Suspense fallback={null}>
        <HelixBackground />
      </Suspense>
      <Suspense fallback={null}>
        <NeuralBackground isHovered={false} />
      </Suspense>
      
      <div className="page-content">
        <div className="content-wrapper">
          <section className="page-header">
            <h1 className="page-title">Admin - Subscribers</h1>
            <p className="page-subtitle">
              Email subscribers and market research data
            </p>
          </section>

          <div className="admin-controls">
            <button onClick={exportCSV} className="admin-button">
              Export CSV
            </button>
            <button onClick={() => fetchSubscribers(pagination.page)} className="admin-button">
              Refresh
            </button>
            <div className="admin-stats">
              Total Subscribers: <strong>{pagination.total}</strong>
            </div>
          </div>

          {loading && (
            <div className="admin-loading">Loading subscribers...</div>
          )}

          {error && (
            <div className="admin-error">Error: {error}</div>
          )}

          {!loading && !error && (
            <>
              <div className="subscribers-table">
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Subscribed At</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>
                          No subscribers yet
                        </td>
                      </tr>
                    ) : (
                      subscribers.map((subscriber) => (
                        <tr key={subscriber.id}>
                          <td>{subscriber.email}</td>
                          <td>{new Date(subscriber.subscribed_at).toLocaleString()}</td>
                          <td>{subscriber.source || 'website'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {pagination.totalPages > 1 && (
                <div className="admin-pagination">
                  <button 
                    onClick={() => fetchSubscribers(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="admin-button"
                  >
                    Previous
                  </button>
                  <span>
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button 
                    onClick={() => fetchSubscribers(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                    className="admin-button"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Admin



