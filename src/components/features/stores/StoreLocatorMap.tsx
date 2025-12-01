'use client'

type StoreLocatorMapProps = {
  stores?: Array<{
    id: string
    name: string
    lat: number
    lng: number
  }>
}

export function StoreLocatorMap({ stores = [] }: StoreLocatorMapProps) {
  return (
    <div>
      {/* Map component will be implemented here */}
      <p>Store Locator Map</p>
    </div>
  )
}

