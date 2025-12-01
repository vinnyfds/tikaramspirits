type TastingWheelProps = {
  tastingNotes: {
    sweet?: number
    oak?: number
    spice?: number
    fruit?: number
  }
}

export function TastingWheel({ tastingNotes }: TastingWheelProps) {
  // Normalize values to 0-10 scale (assuming they're already on that scale)
  const sweet = tastingNotes.sweet || 0
  const oak = tastingNotes.oak || 0
  const spice = tastingNotes.spice || 0
  const fruit = tastingNotes.fruit || 0

  // SVG dimensions
  const size = 400
  const center = size / 2
  const radius = 150
  const maxValue = 10

  // Convert values to polar coordinates (radar chart)
  // Angles: 0° = top, 90° = right, 180° = bottom, 270° = left
  const getPoint = (value: number, angle: number) => {
    const normalizedRadius = (value / maxValue) * radius
    const x = center + normalizedRadius * Math.sin(angle)
    const y = center - normalizedRadius * Math.cos(angle)
    return { x, y }
  }

  // Calculate angles for each axis (4 axes evenly spaced)
  const sweetAngle = 0 // Top
  const oakAngle = Math.PI / 2 // Right
  const spiceAngle = Math.PI // Bottom
  const fruitAngle = (3 * Math.PI) / 2 // Left

  // Get points for the polygon
  const sweetPoint = getPoint(sweet, sweetAngle)
  const oakPoint = getPoint(oak, oakAngle)
  const spicePoint = getPoint(spice, spiceAngle)
  const fruitPoint = getPoint(fruit, fruitAngle)

  // Create polygon path
  const polygonPath = `M ${sweetPoint.x} ${sweetPoint.y} L ${oakPoint.x} ${oakPoint.y} L ${spicePoint.x} ${spicePoint.y} L ${fruitPoint.x} ${fruitPoint.y} Z`

  // Grid circles (concentric circles for reference)
  const gridLevels = 5
  const gridCircles = []
  for (let i = 1; i <= gridLevels; i++) {
    const r = (radius / gridLevels) * i
    gridCircles.push(
      <circle
        key={i}
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="1"
      />
    )
  }

  // Grid lines (axes)
  const axes = [
    { angle: sweetAngle, label: 'Sweet', x: center, y: center - radius - 20 },
    { angle: oakAngle, label: 'Oak', x: center + radius + 20, y: center },
    { angle: spiceAngle, label: 'Spice', x: center, y: center + radius + 20 },
    { angle: fruitAngle, label: 'Fruit', x: center - radius - 20, y: center },
  ]

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md">
        {/* Grid circles */}
        {gridCircles}

        {/* Grid axes */}
        {axes.map((axis, index) => {
          const endX = center + radius * Math.sin(axis.angle)
          const endY = center - radius * Math.cos(axis.angle)
          return (
            <g key={index}>
              <line
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <text
                x={axis.x}
                y={axis.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-sans text-sm font-semibold fill-tikaram-charcoal"
              >
                {axis.label}
              </text>
            </g>
          )
        })}

        {/* Filled polygon */}
        <path
          d={polygonPath}
          fill="#D4AF37"
          fillOpacity="0.3"
          stroke="#D4AF37"
          strokeWidth="2"
        />

        {/* Data points */}
        <circle cx={sweetPoint.x} cy={sweetPoint.y} r="4" fill="#D4AF37" />
        <circle cx={oakPoint.x} cy={oakPoint.y} r="4" fill="#D4AF37" />
        <circle cx={spicePoint.x} cy={spicePoint.y} r="4" fill="#D4AF37" />
        <circle cx={fruitPoint.x} cy={fruitPoint.y} r="4" fill="#D4AF37" />
      </svg>
    </div>
  )
}
