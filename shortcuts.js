const shortcuts = new Map(
  [...document.querySelectorAll("a[aria-keyshortcuts]")].map((link) => [
    link.getAttribute("aria-keyshortcuts").toLowerCase(),
    link,
  ]),
);

const copyStatus = document.getElementById("copy-status");
let copyStatusTimer;

document.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
  if (event.target.closest("input, textarea, select, [contenteditable]")) return;

  const link = shortcuts.get(event.key.toLowerCase());
  if (!link) return;

  event.preventDefault();
  link.classList.add("pressed");
  setTimeout(() => link.classList.remove("pressed"), 240);

  link.click();
});

for (const link of document.querySelectorAll('a[href^="mailto:"]')) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    copyEmail(link);
  });
}

async function copyEmail(link) {
  try {
    await navigator.clipboard.writeText(link.href.replace(/^mailto:/, ""));
  } catch {
    location.href = link.href;
    return;
  }

  copyStatus.textContent = "Copied";
  copyStatus.classList.add("shown");
  clearTimeout(copyStatusTimer);
  copyStatusTimer = setTimeout(() => copyStatus.classList.remove("shown"), 1600);
}
