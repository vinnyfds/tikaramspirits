type Store = {
  id: string
  name: string
  address_line1: string
  city: string
  state: string
  zip_code: string
  phone?: string
}

type StoreListProps = {
  stores: Store[]
}

export function StoreList({ stores }: StoreListProps) {
  return (
    <div>
      {stores.map((store) => (
        <div key={store.id}>
          <h3>{store.name}</h3>
          <p>{store.address_line1}</p>
          <p>{store.city}, {store.state} {store.zip_code}</p>
          {store.phone && <p>{store.phone}</p>}
        </div>
      ))}
    </div>
  )
}

