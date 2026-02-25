export function formatTime(ms: number): string {
  const sec = ms / 1000
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec % 3600) / 60)
  const seconds = Math.floor(sec % 60)

  return [hours, minutes, seconds].map(v => String(v).padStart(2, '0')).join(':')
}
