import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function MetricsChart({ title, data, dataKey, color }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis dataKey="time" stroke="#718096" tick={{ fontSize: 11 }} />
          <YAxis stroke="#718096" tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ background: '#1a202c', border: '1px solid #2d3748' }} />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MetricsChart
