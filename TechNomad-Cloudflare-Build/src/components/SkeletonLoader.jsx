import React from 'react'

const SkeletonLoader = ({ type = 'default' }) => {
  if (type === 'card') {
    return (
      <div className="skeleton-card">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-text"></div>
        <div className="skeleton-line skeleton-text"></div>
        <div className="skeleton-line skeleton-text-short"></div>
      </div>
    )
  }

  if (type === 'button') {
    return (
      <div className="skeleton-button"></div>
    )
  }

  return (
    <div className="skeleton-loader">
      <div className="skeleton-shimmer"></div>
    </div>
  )
}

export default SkeletonLoader

