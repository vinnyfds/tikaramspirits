type SensoryChartProps = {
  data: Array<{
    category: string
    intensity: number // 0 to 5
  }>
}

export function SensoryChart({ data }: SensoryChartProps) {
  // SVG dimensions
  const size = 400
  const center = size / 2
  const radius = 150
  const maxValue = 5

  // Convert values to polar coordinates (radar chart)
  // Angles: 0° = top, 90° = right, 180° = bottom, 270° = left
  const getPoint = (value: number, angle: number) => {
    const normalizedRadius = (value / maxValue) * radius
    const x = center + normalizedRadius * Math.sin(angle)
    const y = center - normalizedRadius * Math.cos(angle)
    return { x, y }
  }

  // Calculate angles for each axis (evenly spaced)
  const numAxes = data.length
  const axes = data.map((item, index) => {
    const angle = (index * 2 * Math.PI) / numAxes
    const point = getPoint(item.intensity, angle)
    const labelX = center + (radius + 20) * Math.sin(angle)
    const labelY = center - (radius + 20) * Math.cos(angle)
    return {
      angle,
      label: item.category,
      point,
      labelX,
      labelY,
    }
  })

  // Create polygon path
  const polygonPath = axes
    .map((axis, index) => {
      const command = index === 0 ? 'M' : 'L'
      return `${command} ${axis.point.x} ${axis.point.y}`
    })
    .join(' ') + ' Z'

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

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[320px]"
      >
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
                x={axis.labelX}
                y={axis.labelY}
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
        {axes.map((axis, index) => (
          <circle
            key={index}
            cx={axis.point.x}
            cy={axis.point.y}
            r="4"
            fill="#D4AF37"
          />
        ))}
      </svg>
    </div>
  )
}

