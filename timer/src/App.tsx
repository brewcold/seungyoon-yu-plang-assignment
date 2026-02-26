import './App.css'
import { useEffect, useRef, useState } from 'react'
import { formatTime } from './utils/formatTime'

type RunningState = 'RUNNING' | 'PAUSED' | 'IDLE'

function App() {
  const [runningState, setRunningState] = useState<RunningState>('IDLE')
  const [displayTime, setDisplayTime] = useState(0)

  const startTimeRef = useRef<number>(0)
  const lapRef = useRef<number>(0)

  /** 시작시간은 상태가 아닌 값으로 두고, 100ms마다 현재 시간과 비교해 상태 업데이트  */
  useEffect(() => {
    if (!startTimeRef.current || runningState !== 'RUNNING') return

    const i = setInterval(() => {
      setDisplayTime(performance.now() - startTimeRef.current)
    }, 100) //업데이트 최대 딜레이가 (<0.1s + a) 정도만 발생하도록

    return () => clearInterval(i)
  }, [runningState])

  /** 지정한 시간이 지났음을 알려줌, 단 타이머를 정지시키지는 않음  */
  const [targetSecs, setTargetSecs] = useState(0)
  const targetSecsInputRef = useRef<HTMLInputElement>(null)
  const [displayAlarm, setDisplayAlarm] = useState<boolean>(false)
  const passedSecs = Math.floor(displayTime / 1000)
  useEffect(() => {
    if (targetSecs < 1) return
    if (!displayAlarm && passedSecs >= targetSecs) setDisplayAlarm(true)
  }, [passedSecs, targetSecs])

  /** 타이머 시작 시 시작시간 설정, pause할 때 시작시간 보정, reset은 모든 입력값 및 시간 초기화  */
  const handleStart = () => {
    startTimeRef.current = performance.now() - lapRef.current
    setRunningState('RUNNING')
  }
  const handlePause = () => {
    lapRef.current = displayTime
    setDisplayAlarm(false)
    setRunningState('PAUSED')
  }
  const handleReset = () => {
    startTimeRef.current = 0
    lapRef.current = 0
    setDisplayTime(0)
    setTargetSecs(0)
    if (targetSecsInputRef.current) targetSecsInputRef.current.value = '0'
    setDisplayAlarm(false)
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

      <div className={`alarm ${displayAlarm ? 'open' : 'closed'}`}>{targetSecs}초가 지났습니다</div>

      <div className="controller">
        <div className="controller-inputs">
          <input
            ref={targetSecsInputRef}
            type="number"
            defaultValue={0}
            onFocus={() => setDisplayAlarm(false)}
            onBlur={e => setTargetSecs(Number(e.currentTarget.value))}
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
