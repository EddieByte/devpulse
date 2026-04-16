import { useState, useEffect, useRef } from "react"
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client/dist/sockjs"
import Header from "./components/Header"
import HeroBanner from "./components/HeroBanner"
import MetricsDashboard from "./components/MetricsDashboard"
import "./App.css"

function App() {
  const [metrics, setMetrics] = useState(null)
  const [history, setHistory] = useState([])
  const [connected, setConnected] = useState(false)
  const [activePage, setActivePage] = useState("overview")
  const clientRef = useRef(null)

  useEffect(() => {
    const wsUrl = window.location.origin + "/ws"

    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      onConnect: () => {
        setConnected(true)
        client.subscribe("/topic/metrics", (message) => {
          const data = JSON.parse(message.body)
          setMetrics(data)
          setHistory(prev => [...prev.slice(-30), {
            ...data,
            time: new Date(data.timestamp).toLocaleTimeString()
          }])
        })
      },
      onDisconnect: () => setConnected(false),
      reconnectDelay: 3000
    })
    client.activate()
    clientRef.current = client
    return () => client.deactivate()
  }, [])

  return (
    <div className="app">
      <Header connected={connected} activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {activePage === "overview" && <HeroBanner />}
        <MetricsDashboard metrics={metrics} history={history} activePage={activePage} />
      </main>
    </div>
  )
}

export default App