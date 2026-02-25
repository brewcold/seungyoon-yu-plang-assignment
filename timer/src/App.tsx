import { useEffect, useRef, useState } from 'react'
import './App.css'
import { formatTime } from './utils/formatTime'

type RunningState = 'RUNNING' | 'PAUSED' | 'IDLE'

function App() {
  const [runningState, setRunningState] = useState<RunningState>('IDLE')
  const [displayTime, setDisplayTime] = useState(0)
  const [countdown, setCountdown] = useState<number>(0)

  const startTimeRef = useRef<number>(0)
  const lapRef = useRef<number>(0)

  useEffect(() => {
    if (!startTimeRef.current || runningState !== 'RUNNING') return

    const i = setInterval(() => {
      setDisplayTime(performance.now() - startTimeRef.current)
    }, 100)

    return () => clearInterval(i)
  }, [runningState])

  const [overlayOpen, setOverlayOpen] = useState<boolean>(false)
  useEffect(() => {
    if (countdown < 1) return
    if (Math.floor(displayTime / 1000) >= countdown && Math.floor(displayTime / 1000) < countdown + 1) {
      setOverlayOpen(true)
    }
  }, [Math.floor(displayTime / 1000)])

  const handleStart = () => {
    startTimeRef.current = performance.now() - lapRef.current
    setRunningState('RUNNING')
  }

  const handlePause = () => {
    lapRef.current = displayTime
    setOverlayOpen(false)
    setRunningState('PAUSED')
  }

  const handleReset = () => {
    startTimeRef.current = 0
    lapRef.current = 0
    setDisplayTime(0)
    setOverlayOpen(false)
    setRunningState('IDLE')
  }

  const time = formatTime(displayTime)

  return (
    <main className="frame">
      <div className="timer">
        {time.split('').map((c, i) => (
          <span key={`${c}_${i}`} className={c === ':' ? 'colon' : 'num'}>
            {c}
          </span>
        ))}
      </div>
      <div className={`overlay ${overlayOpen ? 'open' : 'closed'}`}>{countdown}초가 지났습니다</div>
      <div className="controller">
        <div className="controller-inputs">
          <input
            type="number"
            value={countdown}
            onChange={e => {
              setCountdown(Number(e.currentTarget.value))
            }}
            disabled={runningState === 'RUNNING'}
          />
          <span>초 시점에 알림</span>
        </div>
        <div className="controller-buttons">
          <button type="button" onClick={handleReset} disabled={runningState !== 'PAUSED'}>
            취소
          </button>

          {!(runningState === 'RUNNING') ? (
            <button type="button" onClick={handleStart}>
              시작
            </button>
          ) : (
            <button type="button" onClick={handlePause} disabled={runningState !== 'RUNNING'}>
              일시정지
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default App
