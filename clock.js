const clock = document.getElementById("local-time");
const timeZone = "Asia/Dubai";
const format = new Intl.DateTimeFormat("en-US", {
  timeZone,
  hour: "numeric",
  minute: "2-digit",
});

function tick() {
  const now = new Date();
  clock.textContent = format.format(now);
  clock.dateTime = now.toISOString();
  setTimeout(tick, 60000 - (now.getTime() % 60000));
}

tick();
