import './App.css'
import { useEffect, useRef, useState } from 'react'
import { formatTime } from './utils/formatTime'

type RunningState = 'RUNNING' | 'PAUSED' | 'IDLE'

function App() {
  const [runningState, setRunningState] = useState<RunningState>('IDLE')
  const [displayTime, setDisplayTime] = useState(0)
  const [targetSecs, setTargetSecs] = useState<number>(0)

  const startTimeRef = useRef<number>(0)
  const lapRef = useRef<number>(0)

  /** 시작시간은 상태가 아닌 값으로 두고, 100ms마다 현재 시간과 비교해 상태 업데이트  */
  useEffect(() => {
    if (!startTimeRef.current || runningState !== 'RUNNING') return

    const i = setInterval(() => {
      setDisplayTime(performance.now() - startTimeRef.current)
    }, 100)

    return () => clearInterval(i)
  }, [runningState])

  /** 지정한 시간이 지났음을 알려줌, 단 타이머를 정지시키지는 않음  */
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false)
  const passedSecs = Math.floor(displayTime / 1000)
  useEffect(() => {
    if (targetSecs < 1) return
    if (passedSecs >= targetSecs && passedSecs < targetSecs + 1) {
      setOverlayOpen(true)
    }
  }, [passedSecs])

  /** 타이머 시작 시 시작시간 설정, pause할 때 시작시간 보정  */
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
    setTargetSecs(0)
    setOverlayOpen(false)
    setRunningState('IDLE')
  }

  const timeString = formatTime(displayTime)
  return (
    <main className="frame">
      <div className="timer">
        {timeString.split('').map((c, i) => (
          <span key={`${c}_${i}`} className={c === ':' ? 'colon' : 'num'}>
            {c}
          </span>
        ))}
      </div>
      <div className="timerstate">Timer is {runningState}</div>

      <div className={`alarm ${overlayOpen ? 'open' : 'closed'}`}>{targetSecs}초가 지났습니다</div>

      <div className="controller">
        <div className="controller-inputs">
          <input
            type="number"
            value={targetSecs}
            onChange={e => setTargetSecs(Number(e.currentTarget.value))}
            disabled={runningState === 'RUNNING'}
          />
          <span>초 시점에 알림</span>
        </div>
        <div className="controller-buttons">
          <button type="button" onClick={handleReset} disabled={runningState !== 'PAUSED'}>
            Reset
          </button>

          <button type="button" onClick={handleStart} disabled={runningState === 'RUNNING'}>
            Start
          </button>

          <button type="button" onClick={handlePause} disabled={runningState !== 'RUNNING'}>
            Pause
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
