const CONFIG = {
  javaAddress: "surviva1.hostserv.xyz",
  bedrockAddress: "spidersmp.mc-join.org",
  bedrockPort: 27317,
  refreshMs: 60000
};

const $ = id => document.getElementById(id);

async function refreshStatus() {
  const statusText = $("statusText");
  const light = $("statusLight");
  if (statusText) statusText.textContent = "CHECKING STATUS...";
  try {
    const response = await fetch(
      `https://api.mcsrvstat.us/3/${encodeURIComponent(CONFIG.javaAddress)}`,
      { cache: "no-store" }
    );
    if (!response.ok) throw new Error("Status request failed");
    const data = await response.json();

    if (data.online) {
      statusText.textContent = "● ONLINE";
      statusText.style.color = "#35df9a";
      light.style.background = "#35df9a";
      light.style.color = "#35df9a";
      $("players").textContent =
        `${data.players?.online ?? 0} / ${data.players?.max ?? "?"}`;
      $("version").textContent = data.version || "Unknown";
      $("serverMotd").textContent =
        data.motd?.clean?.join(" ") || "Welcome to SPIDER MC!";
      if (data.icon) $("serverIcon").src = data.icon;
    } else {
      statusText.textContent = "● OFFLINE";
      statusText.style.color = "#ff647c";
      light.style.background = "#ff647c";
      light.style.color = "#ff647c";
      $("players").textContent = "0 / --";
      $("version").textContent = "--";
      $("serverMotd").textContent = "The server is currently offline.";
      $("serverIcon").src = "assets/logo.svg";
    }
  } catch (error) {
    statusText.textContent = "● STATUS UNAVAILABLE";
    statusText.style.color = "#ffc04b";
    light.style.background = "#ffc04b";
    $("players").textContent = "-- / --";
    $("version").textContent = "--";
    $("serverMotd").textContent = "Could not load server status. Please try again later.";
  }
  $("lastUpdated").textContent =
    "Last checked: " + new Date().toLocaleTimeString();
}

document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      $("toast").textContent = "Copied: " + value;
    } catch {
      $("toast").textContent = "Copy unavailable. Please copy manually: " + value;
    }
    $("toast").classList.add("show");
    setTimeout(() => $("toast").classList.remove("show"), 2200);
  });
});

$("menuToggle").addEventListener("click", () => {
  $("nav").classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => $("nav").classList.remove("open"));
});

$("year").textContent = new Date().getFullYear();
refreshStatus();
setInterval(refreshStatus, CONFIG.refreshMs);
