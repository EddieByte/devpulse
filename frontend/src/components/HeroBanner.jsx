function HeroBanner() {
  const features = [
    { icon: "LIVE", title: "Real-Time Streaming", desc: "Metrics pushed every 2 seconds via WebSocket — no polling, no page refresh.", color: "#68d391" },
    { icon: "MEM", title: "JVM Memory Tracking", desc: "Monitor heap and non-heap memory usage to detect leaks and pressure points.", color: "#63b3ed" },
    { icon: "THR", title: "Thread Monitoring", desc: "Track live, peak, and daemon threads to understand JVM concurrency behaviour.", color: "#f6ad55" },
    { icon: "SYS", title: "System Visibility", desc: "Expose OS name, architecture, CPU count, and JVM runtime details in one place.", color: "#b794f4" }
  ]

  return (
    <div className="hero">
      <div className="hero-text">
        <div className="hero-eyebrow">Observability Tool</div>
        <h2 className="hero-title">Real-Time JVM & System Metrics Dashboard</h2>
        <p className="hero-desc">
          DevPulse is a full-stack observability tool built with <strong>Spring Boot</strong>, <strong>Micrometer</strong>,
          and <strong>WebSocket</strong> on the backend, and <strong>React</strong> with live charts on the frontend.
          It streams JVM and system metrics in real time, deployed on <strong>AWS EKS</strong> via a
          fully automated <strong>Jenkins + ArgoCD</strong> CI/CD pipeline.
        </p>
      </div>
      <div className="hero-cards">
        {features.map((f, i) => (
          <div className="hero-card" key={i} style={{ borderLeft: "3px solid " + f.color }}>
            <span className="hero-badge" style={{ background: f.color + "22", color: f.color }}>{f.icon}</span>
            <div>
              <div className="hero-card-title">{f.title}</div>
              <div className="hero-card-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeroBanner