import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const ActivityChart = ({ type = 'line', data, options }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !data) return

    const chart = new Chart(canvasRef.current, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { color: '#475569' } },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(148, 163, 184, 0.15)' } },
          y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(148, 163, 184, 0.15)' } },
        },
        ...options,
      },
    })

    return () => chart.destroy()
  }, [type, data, options])

  return (
    <div className="h-[320px] rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default ActivityChart
