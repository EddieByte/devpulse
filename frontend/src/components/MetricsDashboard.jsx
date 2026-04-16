import StatCard from './StatCard'
import MetricsChart from './MetricsChart'
import SystemInfo from './SystemInfo'

function MetricsDashboard({ metrics, history, activePage }) {
  if (!metrics) return <div className="waiting">Connecting to DevPulse backend...</div>

  const heapPercent = Math.round((metrics.heapUsed / metrics.heapMax) * 100)
  const formatUptime = (s) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return h > 0 ? h + 'h ' + m + 'm' : m > 0 ? m + 'm ' + sec + 's' : sec + 's'
  }

  if (activePage === 'overview') return (
    <div className="dashboard">
      <div className="section-label">Live Metrics</div>
      <div className="cards">
        <StatCard title="CPU Load" value={metrics.cpuLoad === -1 ? 'N/A' : (metrics.cpuLoad * 100).toFixed(1) + '%'} color="#63b3ed" tooltip="Average system CPU load. Shows N/A on Windows ? live on Linux/EKS." />
        <StatCard title="Heap Used" value={metrics.heapUsed + ' MB'} color="#68d391" tooltip="JVM heap memory currently in use by the application." />
        <StatCard title="Heap Max" value={metrics.heapMax + ' MB'} color="#f6ad55" tooltip="Maximum heap memory the JVM is allowed to use." />
        <StatCard title="Heap Usage" value={heapPercent + '%'} color="#fc8181" tooltip="Percentage of max heap currently consumed. High values may trigger GC pressure." />
        <StatCard title="Uptime" value={formatUptime(metrics.uptimeSeconds)} color="#b794f4" tooltip="How long the JVM has been running since last startup." />
      </div>
      <div className="charts">
        <MetricsChart title="Heap Memory Usage (MB)" data={history} dataKey="heapUsed" color="#68d391" />
      </div>
    </div>
  )

  if (activePage === 'memory') return (
    <div className="dashboard">
      <div className="section-label">Memory Analysis</div>
      <div className="cards">
        <StatCard title="Heap Used" value={metrics.heapUsed + ' MB'} color="#68d391" tooltip="JVM heap memory actively used by objects." />
        <StatCard title="Heap Committed" value={metrics.heapCommitted + ' MB'} color="#63b3ed" tooltip="Memory committed by the OS to the JVM heap ? reserved but may not all be in use." />
        <StatCard title="Heap Max" value={metrics.heapMax + ' MB'} color="#f6ad55" tooltip="Hard ceiling on heap. JVM throws OutOfMemoryError if this is exceeded." />
        <StatCard title="Non-Heap Used" value={metrics.nonHeapUsed + ' MB'} color="#b794f4" tooltip="Memory used for JVM internals ? class metadata, JIT compiled code, etc." />
        <StatCard title="Non-Heap Committed" value={metrics.nonHeapCommitted + ' MB'} color="#fc8181" tooltip="Non-heap memory committed by the OS to the JVM." />
      </div>
      <div className="charts">
        <MetricsChart title="Heap Used (MB)" data={history} dataKey="heapUsed" color="#68d391" />
        <MetricsChart title="Non-Heap Used (MB)" data={history} dataKey="nonHeapUsed" color="#b794f4" />
      </div>
    </div>
  )

  if (activePage === 'threads') return (
    <div className="dashboard">
      <div className="section-label">Thread Activity</div>
      <div className="cards">
        <StatCard title="Live Threads" value={metrics.threadCount} color="#63b3ed" tooltip="Number of threads currently active in the JVM." />
        <StatCard title="Peak Threads" value={metrics.peakThreadCount} color="#f6ad55" tooltip="Highest thread count recorded since JVM started. Useful for detecting thread spikes." />
        <StatCard title="Daemon Threads" value={metrics.daemonThreadCount} color="#68d391" tooltip="Background service threads. These don't prevent JVM shutdown." />
        <StatCard title="User Threads" value={metrics.threadCount - metrics.daemonThreadCount} color="#fc8181" tooltip="Non-daemon threads doing application work. JVM stays alive while these run." />
      </div>
      <div className="charts">
        <MetricsChart title="Live Thread Count" data={history} dataKey="threadCount" color="#63b3ed" />
      </div>
    </div>
  )

  if (activePage === 'system') return (
    <div className="dashboard">
      <div className="section-label">System Information</div>
      <SystemInfo metrics={metrics} />
    </div>
  )
}

export default MetricsDashboard
