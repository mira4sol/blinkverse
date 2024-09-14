export function getOS() {
  const userAgent = navigator.userAgent

  if (userAgent.indexOf('Mac') !== -1) {
    return 'Mac'
  }

  if (userAgent.indexOf('Windows') !== -1) {
    return 'Windows'
  }

  // Handle other operating systems gracefully (optional)
  return 'Unknown'
}
