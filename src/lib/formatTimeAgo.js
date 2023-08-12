export function formatTimeAgo(dateString) {
  const timestamp = new Date(dateString).getTime();
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      if (unit === "year" || unit === "month") {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      } else if (unit === "day") {
        return interval === 1 ? "1 day ago" : `${interval} days ago`;
      } else {
        return `${interval}${unit.charAt(0) === "h" ? "h" : "m"} ago`;
      }
    }
  }

  return "Just now";
}
