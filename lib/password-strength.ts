export function passwordScore(pw: string) {
  if (!pw) return 0

  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  // 0..5
  return Math.min(score, 5)
}

export function passwordLabel(score: number) {
  if (score <= 1) return 'Weak'
  if (score === 2) return 'Fair'
  if (score === 3) return 'Good'
  if (score === 4) return 'Strong'
  return 'Very strong'
}
