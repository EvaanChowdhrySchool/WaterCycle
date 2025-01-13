const windowElement = document.getElementById("windowElement");
const titleBar = document.getElementById("title-bar");
const commandInput = document.getElementById("command-input");
const outputContainer = document.getElementById("output-container");
const footer = document.getElementById("footer");
const footerText = document.getElementById("footer-text");
const reopenBtn = document.getElementById("reopen-btn");
const redLight = document.getElementById("red-light");
const yellowLight = document.getElementById("yellow-light");
const greenLight = document.getElementById("green-light");


function updateTrafficLights() {
  if (document.activeElement === commandInput) {
    redLight.style.backgroundColor = "#ff5f56";
    yellowLight.style.backgroundColor = "#ffbd2e";
    greenLight.style.backgroundColor = "#27c93f";
  } else {
    redLight.style.backgroundColor = "#4C4C4C";
    yellowLight.style.backgroundColor = "#4C4C4C";
    greenLight.style.backgroundColor = "#4C4C4C";
  }
}

commandInput.addEventListener("focus", updateTrafficLights);
commandInput.addEventListener("blur", updateTrafficLights);

updateTrafficLights();

async function fetchNpmDownloads(packageName) {
  const currentDate = new Date().toISOString().split('T')[0];
  const response = await fetch(`https://api.npmjs.org/downloads/point/2020-01-01:${currentDate}/${packageName}`);
  const data = await response.json();
  return data.downloads || 0;
}

async function getTotalDownloads(username) {
  const packageNames = await fetchUserPackages(username);
  const downloadPromises = packageNames.map(fetchNpmDownloads);
  const downloadsArray = await Promise.all(downloadPromises);
  const totalDownloads = downloadsArray.reduce((sum, downloads) => sum + downloads, 0);
  return totalDownloads.toLocaleString();
}



const username = 'phantom8015';

let isClosed = false;
let isMinimized = false;
let isMaximized = false;

redLight.addEventListener("click", () => {
  if (!isClosed) {
    closeWindow();
  } else {
    reopenWindow();
  }
});

yellowLight.addEventListener("click", () => {
  if (!isMinimized) {
    minimizeWindow();
  } else {
    reopenWindow();
  }
});

greenLight.addEventListener("click", () => {
  maximizeWindow();
});

footerText.addEventListener("click", () => {
  reopenWindow();
});

document.addEventListener("click", (e) => {
  if (isClosed || isMinimized) {
    if (
      !windowElement.contains(e.target) &&
      e.target !== footer &&
      e.target !== footerText
    ) {
      reopenWindow();
    }
  }
});
document.getElementById("windowElement").addEventListener("click", function () {
  document.getElementById("command-input").focus();
});
function maximizeWindow() {
  if (isMinimized || isClosed) {
    return;
  }
  windowElement.style.transition = "left 0.3s ease, top 0.3s ease, width 0.3s ease, height 0.3s ease";

  if (isMaximized) {
    windowElement.style.left = `${initialLeft}px`;
    windowElement.style.top = `${initialTop}px`;
    windowElement.style.width = `${initialWidth}px`;
    windowElement.style.height = `${initialHeight}px`;
    windowElement.style.transform = "none";
    isMaximized = false;
    updateTerminalTitle();
    return;
  }
  windowElement.style.left = "0";
  windowElement.style.top = "0";
  windowElement.style.width = "100%";
  windowElement.style.height = "100%";
  windowElement.style.transform = "none";
  isMaximized = true;
  updateTerminalTitle();
}

function closeWindow() {
  if (!isClosed) {
    outputContainer.innerHTML = `
            <div id="last-login">Last Login:</div>
            <div class="command-output">Window is closed. Click to reopen.</div>
        `;
    windowElement.style.transition = "left 0.3s ease, top 0.3s ease, width 0.3s ease, height 0.3s ease";
    outputContainer.style.display = "block";
    outputContainer.style.flexDirection = "column";
    outputContainer.style.gap = "20px";
    outputContainer.style.height = "auto";
    outputContainer.style.width = "auto";

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const rect = windowElement.getBoundingClientRect();

    const centerX = (windowWidth - rect.width) / 2;
    const centerY = (windowHeight - rect.height) / 2;

    windowElement.style.left = `${centerX}px`;
    windowElement.style.top = `${centerY}px`;

    windowElement.style.transform = "scale(0.1, 0.1) translate(5px, calc(100% - 10px))";
    windowElement.style.transition = "transform 0.3s ease";

    setTimeout(() => {
      windowElement.style.display = "none";
    }, 300);

    footer.style.display = "block";
    footerText.textContent =
      "Window is closed. Click or tap anywhere to reopen.";
    isClosed = true;
  }
}

function reopenWindow() {
  if (isMinimized) {
    windowElement.style.display = "block";
    footer.style.display = "none";
    setTimeout(() => {
      windowElement.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      windowElement.style.transform = "none";
      windowElement.style.opacity = "1";
    }, 10);
    isClosed = false;
    isMinimized = false;
    updateTerminalTitle();
  } else if (isClosed) {
    windowElement.style.display = "block";
    setTimeout(() => {
      windowElement.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      windowElement.style.left = `${initialLeft}px`;
      windowElement.style.top = `${initialTop}px`;
      windowElement.style.width = `${initialWidth}px`;
      windowElement.style.height = `${initialHeight}px`;
      windowElement.style.transform = "none";
      windowElement.style.opacity = "1";
    }, 10);

    const lastLoginText = `Last Login: ${new Date().toString().split(" ").slice(0, 5).join(" ")}`;
    outputContainer.innerHTML = `
            <div id="last-login">${lastLoginText}</div>
            <div class="command-output">Type 'help' to get started.</div>
        `;
    updateTerminalTitle();
    footer.style.display = "none";
    isClosed = false;
  }
}

function minimizeWindow() {
  if (!isMinimized) {
    windowElement.style.transform = "scale(0.1, 0.1) translate(5px, calc(100% - 10px))";
    windowElement.style.transition = "transform 0.5s ease";
    footer.style.display = "block";
    footerText.textContent =
      "Window is minimized. Click or tap anywhere to reopen.";
    isMinimized = true;

    setTimeout(() => {
      windowElement.style.display = "none";
    }, 500); 
  }
}

document.addEventListener("click", (e) => {
  if (
    (isClosed || isMinimized) &&
    !windowElement.contains(e.target) &&
    e.target !== footer &&
    e.target !== footerText
  ) {
    reopenWindow();
  }
});

let initialLeft, initialTop;
let initialWidth, initialHeight;
let iframemode = false;

window.addEventListener("load", () => {
  updateTerminalTitle();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const rect = windowElement.getBoundingClientRect();
  const centerX = (windowWidth - rect.width) / 2;
  const centerY = (windowHeight - rect.height) / 2;

  initialLeft = centerX;
  initialTop = centerY;
  initialWidth = rect.width;
  initialHeight = rect.height;
  const lastlogin = document.getElementById("last-login");
  lastlogin.textContent =
    "Last Login: " + new Date().toString().split(" ").slice(0, 5).join(" ");
});

function updateTerminalTitle() {
  const rect = windowElement.getBoundingClientRect();
  const titleElement = document.getElementById("title");
  titleElement.textContent = `Phantom8015 — -zsh — ${Math.round(rect.width)}x${Math.round(rect.height)}`;
}

const birthday = new Date(2011, 5, 12);
const ageDifMs = Date.now() - birthday.getTime();
const ageDate = new Date(ageDifMs);
const age = Math.abs(ageDate.getUTCFullYear() - 1970);

const commands = {
  help: "Available commands:\n\n- help: Show this message\n\n- evaporation: Learn about evaporation\n\n- condensation: Learn about condensation\n\n- precipitation: Learn about precipitation\n\n- sublimation: Learn about sublimation\n\n- transpiration: Learn about transpiration\n\n- runoff: Learn about runoff\n\n- infiltration: Learn about infiltration\n\n- summary: Recap the water cycle",
  
  evaporation: "Evaporation is the process by which a liquid turns into a gas at the surface of the liquid, typically below its boiling point. It occurs when molecules in the liquid gain enough energy to break free from the liquid's surface and become vapor. This happens faster at higher temperatures, with more surface area, and in dry or windy conditions. For example, Egypt experiences droughts due to immense heat causing increased evaporation.",
  
  condensation: "Condensation happens when water vapor rises into the atmosphere and cools down, turning back into liquid water (H2O). This process is a crucial part of the water cycle as water vapor in the air condenses to form clouds, eventually leading to precipitation.",
  
  precipitation: "Precipitation occurs when water droplets in clouds become too heavy to remain suspended and fall back to Earth. This can be in the form of rain, snow, sleet, or hail. Precipitation is an essential process in the water cycle as it brings water back to the Earth's surface.",
  
  sublimation: "Sublimation is the process where substances like dry ice (frozen CO2) turn directly from a solid to a gas without first becoming a liquid. In the water cycle, sublimation refers to ice or snow directly turning into vapor in the atmosphere without first melting into water.",
  
  transpiration: "Transpiration is when water evaporates from plant leaves, stems, and other parts into the atmosphere. This process not only cools the plants but also contributes to around 10% of the moisture in the atmosphere. It's an important part of the water cycle and helps maintain the balance of water in the environment.",
  
  runoff: "Runoff occurs when there is excess water that the land cannot absorb. This water either flows into rivers and lakes or evaporates. It’s essentially a form of mild flooding when water overflows onto land and starts to move toward lower ground.",
  
  infiltration: "Infiltration is the process where water moves from the surface into the soil and rocks below. It typically happens after precipitation, where water soaks into the ground, replenishing groundwater and contributing to the overall water cycle. This process is crucial for replenishing natural water sources.",
  
  summary: "To summarize, the water cycle involves the continuous flow of water on Earth through the stages of evaporation, condensation, precipitation, sublimation, transpiration, runoff, and infiltration. These stages work together to maintain the balance of water in the environment and sustain life on Earth.",    

  clear: function () {
    outputContainer.innerHTML = "";
    outputContainer.style.display = "block";
    outputContainer.style.flexDirection = "column";
    outputContainer.style.gap = "20px";
    outputContainer.style.height = "auto";
    outputContainer.style.width = "auto";
  },
};

commandInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const command = commandInput.value.trim().toLowerCase();
    if (command) {
      showCommandOutput(command);
    }
    commandInput.value = "";
  }
  if (event.key === "Tab") {
    event.preventDefault();
    const command = commandInput.value.trim().toLowerCase();
    if (command) {
      const matchingCommand = Object.keys(commands).find((c) =>
        c.startsWith(command),
      );
      if (matchingCommand) {
        commandInput.value = matchingCommand;
      }
    }
  }
});

async function showCommandOutput(command) {
  if (iframemode) {
    iframemode = false;
    outputContainer.innerHTML = "";
    outputContainer.style.display = "block";
    outputContainer.style.flexDirection = "column";
    outputContainer.style.gap = "20px";
    outputContainer.style.height = "auto";
    outputContainer.style.width = "auto";
  }
  let response = `zsh: command not found: ${command}`;
  let responseClass = "error";
  if (commands[command]) {
    response = commands[command];
    if (typeof response === "function") {
      const commandOutput = document.createElement("div");
      commandOutput.classList.add("command-output", responseClass);
      commandOutput.textContent = `(base) Phantom8015@MacBook-Air ~ % ${command}\n`;
      outputContainer.appendChild(commandOutput);
      await response()
      return;
    }
  }

  const commandOutput = document.createElement("div");
  commandOutput.classList.add("command-output", responseClass);
  commandOutput.textContent = `(base) Phantom8015@MacBook-Air ~ % ${command}\n${response}`;

  outputContainer.appendChild(commandOutput);
  container.scrollTop = container.scrollHeight;
}

function showOutput(text, type = "info") {
  const commandOutput = document.createElement("div");
  commandOutput.classList.add("command-output", type);
  commandOutput.textContent = text;
  outputContainer.appendChild(commandOutput);
  outputContainer.scrollTop = outputContainer.scrollHeight;
}

let isDragging = false;
let isResizing = false;
let offsetX, offsetY;
let startX,
  startY,
  startWidth,
  startHeight,
  startLeft,
  startTop,
  resizeDirection;

window.addEventListener("load", () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const rect = windowElement.getBoundingClientRect();

  const centerX = (windowWidth - rect.width) / 2;
  const centerY = (windowHeight - rect.height) / 2;

  initialLeft = centerX;
  initialTop = centerY;
});

titleBar.addEventListener("dblclick", () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const rect = windowElement.getBoundingClientRect();
  
  const centerX = (windowWidth - rect.width) / 2;
  const centerY = (windowHeight - rect.height) / 2;
  windowElement.style.transition = "left 0.3s ease, top 0.3s ease, width 0.3s ease, height 0.3s ease";
  
  windowElement.style.left = `${centerX}px`;
  windowElement.style.top = `${centerY}px`;
  windowElement.style.transform = "none";
  setTimeout(() => {
    windowElement.style.transition = "none";
  } , 300);
});

titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = windowElement.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  document.body.style.userSelect = "none";
  document.body.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    windowElement.style.transition = "none";

    const rect = windowElement.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    newLeft = Math.max(0, Math.min(newLeft, windowWidth - rect.width));
    newTop = Math.max(0, Math.min(newTop, windowHeight - rect.height));

    windowElement.style.left = `${newLeft}px`;
    windowElement.style.top = `${newTop}px`;
    windowElement.style.transform = "none";
  }
});

["top-left", "top-right", "bottom-left", "bottom-right"].forEach((handle) => {
  const resizeHandle = document.createElement("div");
  resizeHandle.className = `resize-handle ${handle}`;
  resizeHandle.dataset.handle = handle;
  windowElement.appendChild(resizeHandle);
});

windowElement.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("resize-handle")) {
    windowElement.style.transition = "none";

    isResizing = true;
    const rect = windowElement.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startWidth = rect.width;
    startHeight = rect.height;
    startLeft = rect.left;
    startTop = rect.top;
    resizeDirection = e.target.dataset.handle;
    e.preventDefault();
  }
});

document.addEventListener("mousemove", (e) => {
  if (isResizing) {
    windowElement.style.transition = "none";
    windowElement.style.transform = "none";
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newWidth = Math.max(200, startWidth + dx);
    let newHeight = Math.max(150, startHeight + dy);

    if (resizeDirection.includes("left")) {
      newWidth = Math.max(200, startWidth - dx);
      windowElement.style.left = `${startLeft + dx}px`;
    }

    if (resizeDirection.includes("top")) {
      newHeight = Math.max(150, startHeight - dy);
      windowElement.style.top = `${startTop + dy}px`;
    }

    windowElement.style.width = `${newWidth}px`;
    windowElement.style.height = `${newHeight}px`;
  }
});
async function fetchUserPackages(username) {
  const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=maintainer:${username}`);
  const data = await response.json();
  return data.objects.map(pkg => pkg.package.name);
}



document.addEventListener("mouseup", () => {
  isDragging = false;
  isResizing = false;
  document.body.style.userSelect = "";
  document.body.style.cursor = "";
  updateTerminalTitle();
});
