type ProductCardProps = {
  name: string
  slug: string
  image?: string
  category?: string
}

export function ProductCard({ name, slug, image, category }: ProductCardProps) {
  return (
    <div>
      {image && <img src={image} alt={name} />}
      <h3>{name}</h3>
      {category && <p>{category}</p>}
    </div>
  )
}

