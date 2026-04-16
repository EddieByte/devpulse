function SystemInfo({ metrics }) {
  const rows = [
    { label: 'Operating System', value: metrics.osName },
    { label: 'OS Version', value: metrics.osVersion },
    { label: 'Architecture', value: metrics.osArch },
    { label: 'Available Processors', value: metrics.availableProcessors },
    { label: 'JVM Name', value: metrics.jvmName },
    { label: 'JVM Version', value: metrics.jvmVersion },
  ]

  return (
    <div className="sysinfo-table">
      {rows.map((row, i) => (
        <div className="sysinfo-row" key={i}>
          <span className="sysinfo-label">{row.label}</span>
          <span className="sysinfo-value">{row.value}</span>
        </div>
      ))}
    </div>
  )
}

export default SystemInfo
