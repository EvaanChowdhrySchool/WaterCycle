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

const animations = {
  evaporation: [
    `
    <span style="color: #87CEEB">     ~ ~ ~ ~</span>
    <span style="color: #87CEEB">    ↑ ↑ ↑ ↑</span>
    <span style="color: #1E90FF">  ~ ~ ~ ~ ~</span>
    <span style="color: #1E90FF">##############</span>`,
    `
    <span style="color: #87CEEB">   ~ ~ ~ ~ ~</span>
    <span style="color: #87CEEB">     ↑ ↑ ↑ ↑</span>
    <span style="color: #1E90FF"> ~ ~ ~ ~ ~ </span>
    <span style="color: #1E90FF">##############</span>`
  ],
  condensation: [
    `
    <span style="color: #FFFFFF">   ☁️  ☁️  ☁️ </span>
    <span style="color: #87CEEB"> ~ ~ ~ ~ ~ ~</span>
    <span style="color: #87CEEB">    ↑   ↑   ↑</span>
    <span style="color: #87CEEB"> ~ ~ ~ ~ ~ ~</span>`,
    `
    <span style="color: #FFFFFF">   ☁️  ☁️  ☁️ </span>
    <span style="color: #87CEEB">  ~ ~ ~ ~ ~ ~</span>
    <span style="color: #87CEEB">     ↑   ↑   ↑</span>
    <span style="color: #87CEEB">  ~ ~ ~ ~ ~ ~</span>`
  ],
  precipitation: [
    `
    <span style="color: #FFFFFF">☁️  ☁️  ☁️</span>
    <span style="color: #1E90FF">   ╱ ╱ ╱</span>
    <span style="color: #1E90FF">  ╱ ╱ ╱</span>
    <span style="color: #1E90FF">╱ ╱ ╱</span>`,
    `
    <span style="color: #FFFFFF">☁️  ☁️  ☁️</span>
    <span style="color: #1E90FF"> ╱ ╱ ╱</span>
    <span style="color: #1E90FF">╱ ╱ ╱</span>
    <span style="color: #1E90FF">     ╱ ╱ ╱</span>`
  ],
  sublimation: [
    `
    <span style="color: #FFFFFF">❄️ </span><span style="color: #87CEEB">→</span> <span style="color: #E6E6FA">💨</span>
    <span style="color: #FFFFFF">❄️ </span><span style="color: #87CEEB">→</span> <span style="color: #E6E6FA">💨</span>
    <span style="color: #FFFFFF">❄️ </span><span style="color: #87CEEB">→</span> <span style="color: #E6E6FA">💨</span>`,
    `
    <span style="color: #FFFFFF">❄️  </span><span style="color: #87CEEB">→</span>  <span style="color: #E6E6FA">💨</span>
    <span style="color: #FFFFFF">❄️  </span><span style="color: #87CEEB">→</span>  <span style="color: #E6E6FA">💨</span>
    <span style="color: #FFFFFF">❄️  </span><span style="color: #87CEEB">→</span>  <span style="color: #E6E6FA">💨</span>`
  ],
  transpiration: [
    `
    <span style="color: #87CEEB">    💧↑</span>  
    <span style="color: #228B22">   🌿🌿</span>
    <span style="color: #228B22">  🌿🌿🌿</span>
    <span style="color: #228B22">🌱🌱🌱🌱</span>`,
    `
    <span style="color: #87CEEB">     💧↑</span>
    <span style="color: #228B22">   🌿🌿</span>
    <span style="color: #228B22">  🌿🌿🌿</span>
    <span style="color: #228B22">🌱🌱🌱🌱</span>`
  ],
  runoff: [
    `
    <span style="color: #A9A9A9">🏔️</span>  <span style="color: #1E90FF">→→→ 💧</span>
    <span style="color: #8B4513"># </span><span style="color: #1E90FF">   →→→ 💧</span>
    <span style="color: #8B4513"># </span><span style="color: #1E90FF">  →→→ 💧</span>
    <span style="color: #8B4513"># </span><span style="color: #1E90FF">→→→ 💧</span>`,
    `
    <span style="color: #A9A9A9">🏔️</span>   <span style="color: #1E90FF">→→→💧</span>
    <span style="color: #8B4513"># </span><span style="color: #1E90FF">    →→→💧</span>
    <span style="color: #8B4513"># </span><span style="color: #1E90FF">   →→→💧</span>
    <span style="color: #8B4513"># </span><span style="color: #1E90FF"> →→→💧</span>`
  ],
  infiltration: [
    `
    <span style="color: #1E90FF">💧💧💧💧</span>
    <span style="color: #1E90FF"> ↓ ↓ ↓</span>
    <span style="color: #8B4513">#######</span>
    <span style="color: #1E90FF"> ↓ ↓ ↓</span>
    <span style="color: #8B4513">#######</span>`,
    `
    <span style="color: #1E90FF">💧💧💧💧</span>
    <span style="color: #1E90FF">  ↓ ↓ ↓</span>
    <span style="color: #8B4513">#######</span>
    <span style="color: #1E90FF">  ↓ ↓ ↓</span>
    <span style="color: #8B4513">#######</span>`
  ],
  summary: [
    `
    <span style="color: #FFFFFF">☁️</span> <span style="color: #87CEEB">←← 💧↑</span>
    <span style="color: #1E90FF">💧↓</span>    <span style="color: #228B22">🌿</span>
    <span style="color: #1E90FF">→→→</span>   <span style="color: #228B22">🌱</span>
    <span style="color: #A9A9A9">🏔️</span> <span style="color: #1E90FF">→→→ 💧</span>`,
    `
    <span style="color: #FFFFFF">☁️</span> <span style="color: #87CEEB">←← 💧↑</span>
    <span style="color: #1E90FF">💧↓</span>     <span style="color: #228B22">🌿</span>
    <span style="color: #1E90FF"> →→→</span>   <span style="color: #228B22">🌱</span>
    <span style="color: #A9A9A9">🏔️</span>  <span style="color: #1E90FF">→→→💧</span>`
  ]
};


class AnimationController {
  constructor(type, container) {
    this.type = type;
    this.container = container;
    this.frame = 0;
    this.interval = null;
  }

  start() {
    this.container.style.whiteSpace = 'pre';
    this.interval = setInterval(() => {
      this.container.innerHTML = animations[this.type][this.frame];
      this.frame = (this.frame + 1) % 2;
    }, 500);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

const commands = {
  help: "Available commands:\n\n- help: Show this message\n- evaporation: Learn about evaporation\n- condensation: Learn about condensation\n- precipitation: Learn about precipitation\n- sublimation: Learn about sublimation\n- transpiration: Learn about transpiration\n- runoff: Learn about runoff\n- infiltration: Learn about infiltration\n- summary: Recap the water cycle\n- clear: Clear what's on screen",

  evaporation: function() {
    const container = document.createElement('div');
    container.className = 'command-output';
    const animationDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    textDiv.style.marginTop = '10px';
    textDiv.textContent = "Evaporation is the process by which a liquid turns into a gas at the surface of the liquid, typically below its boiling point. It occurs when molecules in the liquid gain enough energy to break free from the liquid's surface and become vapor. This happens faster at higher temperatures, with more surface area, and in dry or windy conditions.";
    
    container.appendChild(animationDiv);
    container.appendChild(textDiv);
    outputContainer.appendChild(container);
    
    const animation = new AnimationController('evaporation', animationDiv);
    animation.start();
  },

  condensation: function() {
    const container = document.createElement('div');
    container.className = 'command-output';
    const animationDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    textDiv.style.marginTop = '10px';
    textDiv.textContent = "Condensation happens when water vapor rises into the atmosphere and cools down, turning back into liquid water (H2O). This process is a crucial part of the water cycle as water vapor in the air condenses to form clouds, eventually leading to precipitation.";
    
    container.appendChild(animationDiv);
    container.appendChild(textDiv);
    outputContainer.appendChild(container);
    
    const animation = new AnimationController('condensation', animationDiv);
    animation.start();
  },

  precipitation: function() {
    const container = document.createElement('div');
    container.className = 'command-output';
    const animationDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    textDiv.style.marginTop = '10px';
    textDiv.textContent = "Precipitation occurs when water droplets in clouds become too heavy to remain suspended and fall back to Earth. This can be in the form of rain, snow, sleet, or hail. Precipitation is an essential process in the water cycle as it brings water back to the Earth's surface.";
    
    container.appendChild(animationDiv);
    container.appendChild(textDiv);
    outputContainer.appendChild(container);
    
    const animation = new AnimationController('precipitation', animationDiv);
    animation.start();
  },

  sublimation: function() {
    const container = document.createElement('div');
    container.className = 'command-output';
    const animationDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    textDiv.style.marginTop = '10px';
    textDiv.textContent = "Sublimation is the process where substances like dry ice (frozen CO2) turn directly from a solid to a gas without first becoming a liquid. In the water cycle, sublimation refers to ice or snow directly turning into vapor in the atmosphere without first melting into water.";
    
    container.appendChild(animationDiv);
    container.appendChild(textDiv);
    outputContainer.appendChild(container);
    
    const animation = new AnimationController('sublimation', animationDiv);
    animation.start();
  },

  transpiration: function() {
    const container = document.createElement('div');
    container.className = 'command-output';
    const animationDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    textDiv.style.marginTop = '10px';
    textDiv.textContent = "Transpiration is when water evaporates from plant leaves, stems, and other parts into the atmosphere. This process not only cools the plants but also contributes to around 10% of the moisture in the atmosphere. It's an important part of the water cycle and helps maintain the balance of water in the environment.";
    
    container.appendChild(animationDiv);
    container.appendChild(textDiv);
    outputContainer.appendChild(container);
    
    const animation = new AnimationController('transpiration', animationDiv);
    animation.start();
  },

  runoff: function() {
    const container = document.createElement('div');
    container.className = 'command-output';
    const animationDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    textDiv.style.marginTop = '10px';
    textDiv.textContent = "Runoff occurs when there is excess water that the land cannot absorb. This water either flows into rivers and lakes or evaporates. It's essentially a form of mild flooding when water overflows onto land and starts to move toward lower ground.";
    
    container.appendChild(animationDiv);
    container.appendChild(textDiv);
    outputContainer.appendChild(container);
    
    const animation = new AnimationController('runoff', animationDiv);
    animation.start();
  },

  infiltration: function() {
    const container = document.createElement('div');
    container.className = 'command-output';
    const animationDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    textDiv.style.marginTop = '10px';
    textDiv.textContent = "Infiltration is the process where water moves from the surface into the soil and rocks below. It typically happens after precipitation, where water soaks into the ground, replenishing groundwater and contributing to the overall water cycle. This process is crucial for replenishing natural water sources.";
    
    container.appendChild(animationDiv);
    container.appendChild(textDiv);
    outputContainer.appendChild(container);
    
    const animation = new AnimationController('infiltration', animationDiv);
    animation.start();
  },

  summary: function() {
    const container = document.createElement('div');
    container.className = 'command-output';
    const animationDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    textDiv.style.marginTop = '10px';
    textDiv.textContent = "To summarize, the water cycle involves the continuous flow of water on Earth through the stages of evaporation, condensation, precipitation, sublimation, transpiration, runoff, and infiltration. These stages work together to maintain the balance of water in the environment and sustain life on Earth.";
    
    container.appendChild(animationDiv);
    container.appendChild(textDiv);
    outputContainer.appendChild(container);
    
    const animation = new AnimationController('summary', animationDiv);
    animation.start();
  },

  clear: function() {
    outputContainer.innerHTML = "";
  }
};

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

commandInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    let command = commandInput.value.trim().toLowerCase();
    if (command) {
      const commandOutput = document.createElement("div");
      commandOutput.className = "command-output";
      commandOutput.innerHTML = `(base) WaterCycle@MacBook-Air ~ % ${command}\n`;
      outputContainer.appendChild(commandOutput);
      
      if (typeof commands[command] === "function") {
        commands[command]();
      } else if (commands[command]) {
        const response = document.createElement("div");
        response.className = "command-output";
        response.textContent = commands[command];
        outputContainer.appendChild(response);
      } else {
        const errorOutput = document.createElement("div");
        errorOutput.className = "command-output error";
        errorOutput.textContent = `zsh: command not found: ${command}`;
        outputContainer.appendChild(errorOutput);
      }
    }
    commandInput.value = "";
    outputContainer.scrollTop = outputContainer.scrollHeight;
  }
});

commandInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    let command = commandInput.value.trim().toLowerCase().replaceAll(' ', '_');
    if (command) {
      showCommandOutput(command);
    }
    commandInput.value = "";
  }
  if (event.key === "Tab") {
    event.preventDefault();
    let command = commandInput.value.trim().toLowerCase().replaceAll(' ', '_');
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
  command = commandInput.value.trim().toLowerCase().replaceAll(' ', '_');
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
      let command = commandInput.value.trim().toLowerCase().replaceAll(' ', '_');
      commandOutput.textContent = `(base) WaterCycle@MacBook-Air ~ % ${command}\n`;
      outputContainer.appendChild(commandOutput);
      await response()
      return;
    }
  }

  const commandOutput = document.createElement("div");
  commandOutput.classList.add("command-output", responseClass);
  commandOutput.textContent = `(base) WaterCycle@MacBook-Air ~ % ${command}\n${response}`;

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


document.addEventListener("mouseup", () => {
  isDragging = false;
  isResizing = false;
  document.body.style.userSelect = "";
  document.body.style.cursor = "";
  updateTerminalTitle();
});
