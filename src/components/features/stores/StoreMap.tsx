'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Database } from '@/types/database.types'

type Store = Database['public']['Tables']['stores']['Row']

type StoreMapProps = {
  stores: Store[]
}

// Fix for Leaflet default icons in React/Next.js
const createCustomIcon = () => {
  return L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
}

export function StoreMap({ stores }: StoreMapProps) {
  useEffect(() => {
    // Ensure Leaflet icons are properly initialized
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  const customIcon = createCustomIcon()

  return (
    <MapContainer
      center={[27.6648, -81.5158]}
      zoom={7}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          icon={customIcon}
        >
          <Popup>
            <div className="font-sans">
              <h3 className="font-semibold text-lg text-[#36454F] mb-1">
                {store.name}
              </h3>
              <p className="text-sm text-[#36454F]">
                {store.address_line1}
              </p>
              <p className="text-sm text-[#36454F]">
                {store.city}, {store.state} {store.zip_code}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

