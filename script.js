// Spider MC website settings
// Change these values if your server address or Discord invite changes.
const CONFIG = {
  javaAddress: "surviva1.hostserv.xyz",
  bedrockAddress: "spidersmp.mc-join.org",
  bedrockPort: 27317,
x  refreshMs: 60000
};

const $ = (id) => document.getElementById(id);
const toast = $("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    showToast("Copied to clipboard!");
  } catch {
    const field = document.createElement("textarea");
    field.value = value;
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
    showToast("Copied!");
  }
}

document.querySelectorAll("[data-copy]").forEach(button => {
  button.addEventListener("click", () => copyText(button.dataset.copy));
});

async function refreshStatus() {
  const statusText = $("statusText");
  const light = $("statusLight");
  try {
    // Public status endpoint. This is read-only and does not expose server controls.
    const response = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(CONFIG.javaAddress)}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Status service unavailable");
    const data = await response.json();

    if (data.online) {
      statusText.textContent = "ONLINE";
      light.classList.remove("offline");
      $("playersOnline").textContent = data.players?.online ?? 0;
      $("playerMax").textContent = `/ ${data.players?.max ?? "—"} PLAYERS`;
      const online = Number(data.players?.online || 0);
      const max = Number(data.players?.max || 0);
      $("playerBar").style.width = max > 0 ? `${Math.min(100, online / max * 100)}%` : "0%";
      $("serverVersion").textContent = data.version || "Online";
      $("statusMessage").textContent = data.motd?.clean?.join(" ") || "Your server is online. Join the adventure!";
      const names = data.players?.list || [];
      $("playerList").textContent = names.length ? `ONLINE NOW: ${names.slice(0, 8).join(", ")}` : "Player names are not publicly available.";
    } else {
      statusText.textContent = "OFFLINE";
      light.classList.add("offline");
      $("playersOnline").textContent = "0";
      $("playerMax").textContent = "/ — PLAYERS";
      $("playerBar").style.width = "0%";
      $("serverVersion").textContent = "Offline";
      $("statusMessage").textContent = "The server is currently offline or the status service cannot reach it.";
      $("playerList").textContent = "";
    }
    $("lastUpdated").textContent = `Last checked: ${new Date().toLocaleTimeString()} · Refreshes every 60 seconds.`;
  } catch (error) {
    statusText.textContent = "UNAVAILABLE";
    light.classList.add("offline");
    $("statusMessage").textContent = "Could not load live status. Please try again later.";
    $("serverVersion").textContent = "—";
    $("lastUpdated").textContent = "Status service unavailable. The website itself is still working.";
  }
}

$("menuToggle").addEventListener("click", () => {
  const nav = $("mainNav");
  const open = nav.classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#mainNav a").forEach(link => link.addEventListener("click", () => {
  $("mainNav").classList.remove("open");
  $("menuToggle").setAttribute("aria-expanded", "false");
}));

$("year").textContent = new Date().getFullYear();
refreshStatus();
setInterval(refreshStatus, CONFIG.refreshMs);
