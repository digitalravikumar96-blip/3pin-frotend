import { MapPinIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/properties'

// Custom Bed Icon
function BedIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12v4a2 2 0 002 2h14a2 2 0 002-2v-4M3 12V8a2 2 0 012-2h14a2 2 0 012 2v4M7 6h0M7 6a2 2 0 00-2 2v4" />
    </svg>
  )
}

// Custom Bath Icon
function BathIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12M6 12V8a4 4 0 014-4h0a4 4 0 014 4v4M6 12v4a4 4 0 004 4h0a4 4 0 004-4v-4" />
    </svg>
  )
}

export function PropertyCard({ property }) {
  return (
    <Link
      to={`/property/${property._id ?? property.id}`}
      className="group block prop-card"
    >
      {/* Image Container */}
      <div className="prop-card-image">
        <img
          src={property.images?.[0]}
          alt={property.title}
          loading="lazy"
          className="prop-card-image-media"
        />

        <div className="prop-card-image-gradient" />

        {/* Price and Type on Image */}
        <div className="prop-card-image-info">
          <span className="prop-card-price-overlay">
            {formatPrice(property.price, property.currency)}
          </span>
          {property.type && (
            <span className="prop-card-type-badge">
              {property.type}
            </span>
          )}
        </div>

        {/* Badges */}
        <div className="prop-card-badges">
          {property.isNewDevelopment && (
            <span className="prop-card-badge prop-card-badge-new">
              New Development
            </span>
          )}
          {property.featured && (
            <span className="prop-card-badge prop-card-badge-featured">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="prop-card-content">
        {property.type && (
          <span className="prop-card-tag">{property.type}</span>
        )}

        <h3 className="prop-card-title">{property.title}</h3>

        <div className="prop-card-location">
          <MapPinIcon className="prop-card-icon" />
          <span>{property.location}</span>
        </div>

        <hr className="prop-card-divider" />

        <div className="prop-card-details">
          {property.bedrooms > 0 && (
            <div className="prop-card-detail-item">
              <BedIcon className="prop-card-detail-icon" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="prop-card-detail-item">
              <BathIcon className="prop-card-detail-icon" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          {property.areaSqm > 0 && (
            <div className="prop-card-detail-item">
              <Squares2X2Icon className="prop-card-detail-icon" />
              <span>{property.areaSqm} m²</span>
            </div>
          )}
        </div>

        <div className="prop-card-footer">
          <span className="prop-card-price-main">
            {formatPrice(property.price, property.currency)}
          </span>
          <span className="prop-card-view">View →</span>
        </div>
      </div>
    </Link>
  )
}