import React from 'react';

interface EQSChartProps {
  kinerja: number;
  kompetensi: number;
  pengalaman: number;
  aspirasi: number;
  size?: 'small' | 'medium' | 'large';
}

export function EQSChart({ kinerja, kompetensi, pengalaman, aspirasi, size = 'medium' }: EQSChartProps) {
  // Determine dimensions based on size
  const dimensions = {
    small: { width: 120, height: 120, barHeight: 8, fontSize: '9px', labelSize: '8px' },
    medium: { width: 180, height: 180, barHeight: 12, fontSize: '11px', labelSize: '9px' },
    large: { width: 240, height: 240, barHeight: 16, fontSize: '13px', labelSize: '10px' }
  };

  const { width, height, barHeight, fontSize, labelSize } = dimensions[size];

  const components = [
    { label: 'Kinerja', value: kinerja, color: '#00858A' },
    { label: 'Kompetensi', value: kompetensi, color: '#31C6B1' },
    { label: 'Pengalaman', value: pengalaman, color: '#F48F1E' },
    { label: 'Aspirasi', value: aspirasi, color: '#9B59B6' }
  ];

  const maxValue = 100;
  const padding = 20;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  const barSpacing = (chartHeight - (components.length * barHeight)) / (components.length + 1);

  return (
    <svg width={width} height={height} style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Background */}
      <rect width={width} height={height} fill="transparent" rx="8" />
      
      {/* Bars */}
      {components.map((component, index) => {
        const barWidth = (component.value / maxValue) * chartWidth;
        const y = padding + barSpacing + (index * (barHeight + barSpacing));
        
        return (
          <g key={component.label}>
            {/* Background bar */}
            <rect
              x={padding}
              y={y}
              width={chartWidth}
              height={barHeight}
              fill="rgba(255, 255, 255, 0.2)"
              rx={barHeight / 2}
            />
            
            {/* Filled bar */}
            <rect
              x={padding}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={component.color}
              rx={barHeight / 2}
            />
            
            {/* Label */}
            <text
              x={padding}
              y={y - 4}
              fill="white"
              fontSize={labelSize}
              fontWeight="500"
              opacity="0.9"
            >
              {component.label}
            </text>
            
            {/* Value */}
            <text
              x={padding + barWidth + 8}
              y={y + barHeight / 2 + 1}
              fill="white"
              fontSize={fontSize}
              fontWeight="600"
              dominantBaseline="middle"
            >
              {component.value}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

interface EQSRadialChartProps {
  kinerja: number;
  kompetensi: number;
  pengalaman: number;
  aspirasi: number;
  size?: number;
}

export function EQSRadialChart({ kinerja, kompetensi, pengalaman, aspirasi, size = 140 }: EQSRadialChartProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size / 2) - 20;
  
  const components = [
    { label: 'K', fullLabel: 'Kinerja', value: kinerja, color: '#00858A' },
    { label: 'Ko', fullLabel: 'Kompetensi', value: kompetensi, color: '#31C6B1' },
    { label: 'P', fullLabel: 'Pengalaman', value: pengalaman, color: '#F48F1E' },
    { label: 'A', fullLabel: 'Aspirasi', value: aspirasi, color: '#9B59B6' }
  ];

  // Calculate polygon points based on values
  const maxValue = 100;
  const angles = components.map((_, i) => (i * 2 * Math.PI / components.length) - Math.PI / 2);
  
  const dataPoints = components.map((comp, i) => {
    const r = (comp.value / maxValue) * radius;
    const x = centerX + r * Math.cos(angles[i]);
    const y = centerY + r * Math.sin(angles[i]);
    return { x, y };
  });

  const gridLevels = [25, 50, 75, 100];
  
  return (
    <svg width={size} height={size} style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Grid circles */}
      {gridLevels.map((level) => {
        const r = (level / maxValue) * radius;
        return (
          <circle
            key={level}
            cx={centerX}
            cy={centerY}
            r={r}
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />
        );
      })}
      
      {/* Axis lines */}
      {components.map((comp, i) => {
        const x = centerX + radius * Math.cos(angles[i]);
        const y = centerY + radius * Math.sin(angles[i]);
        return (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={x}
            y2={y}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />
        );
      })}
      
      {/* Data polygon */}
      <polygon
        points={dataPoints.map(p => `${p.x},${p.y}`).join(' ')}
        fill="rgba(255, 255, 255, 0.3)"
        stroke="white"
        strokeWidth="2"
      />
      
      {/* Data points */}
      {dataPoints.map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="4"
          fill={components[i].color}
          stroke="white"
          strokeWidth="2"
        />
      ))}
      
      {/* Labels */}
      {components.map((comp, i) => {
        const labelRadius = radius + 12;
        const x = centerX + labelRadius * Math.cos(angles[i]);
        const y = centerY + labelRadius * Math.sin(angles[i]);
        
        return (
          <text
            key={i}
            x={x}
            y={y}
            fill="white"
            fontSize="10px"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {comp.label}
          </text>
        );
      })}
    </svg>
  );
}
