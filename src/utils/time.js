export function timeAgo(ts) {
  if (!ts) return null
  const diff = Math.floor((Date.now() - ts) / 1000)
  if (diff < 60) return 'práve teraz'
  if (diff < 3600) return `pred ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `pred ${Math.floor(diff / 3600)} hod`
  if (diff < 86400 * 2) return 'pred 1 dňom'
  return `pred ${Math.floor(diff / 86400)} dňami`
}

export function daysOld(ts) {
  if (!ts) return Infinity
  return (Date.now() - ts) / 86400000
}
