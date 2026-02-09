// =======================================================
// 1️⃣ CIRCUITS DROPDOWN DATA & INITIALIZATION
// =======================================================

// List of all F1 circuits used across dropdown selectors
const circuits = [
  "Albert Park Grand Prix Circuit",
  "Sepang International Circuit",
  "Bahrain International Circuit",
  "Circuit de Barcelona-Catalunya",
  "Istanbul Park",
  "Circuit de Monaco",
  "Circuit Gilles Villeneuve",
  "Circuit de Nevers Magny-Cours",
  "Silverstone Circuit",
  "Hockenheimring",
  "Hungaroring",
  "Valencia Street Circuit",
  "Circuit de Spa-Francorchamps",
  "Autodromo Nazionale di Monza",
  "Marina Bay Street Circuit",
  "Fuji Speedway",
  "Shanghai International Circuit",
  "Autódromo José Carlos Pace",
  "Indianapolis Motor Speedway",
  "Nürburgring",
  "Autodromo Enzo e Dino Ferrari",
  "Suzuka Circuit",
  "Las Vegas Strip Street Circuit",
  "Yas Marina Circuit",
  "Autódromo Juan y Oscar Gálvez",
  "Circuito de Jerez",
  "Autódromo do Estoril",
  "Okayama International Circuit",
  "Adelaide Street Circuit",
  "Kyalami",
  "Donington Park",
  "Autódromo Hermanos Rodríguez",
  "Phoenix street circuit",
  "Circuit Paul Ricard",
  "Korean International Circuit",
  "Autódromo Internacional Nelson Piquet",
  "Detroit Street Circuit",
  "Brands Hatch",
  "Circuit Park Zandvoort",
  "Zolder",
  "Dijon-Prenois",
  "Fair Park",
  "Long Beach",
  "Las Vegas Street Circuit",
  "Jarama",
  "Watkins Glen",
  "Scandinavian Raceway",
  "Mosport International Raceway",
  "Montjuïc",
  "Nivelles-Baulers",
  "Charade Circuit",
  "Circuit Mont-Tremblant",
  "Rouen-Les-Essarts",
  "Le Mans",
  "Reims-Gueux",
  "Prince George Circuit",
  "Zeltweg",
  "Aintree",
  "Circuito da Boavista",
  "Riverside International Raceway",
  "AVUS",
  "Monsanto Park Circuit",
  "Sebring International Raceway",
  "Ain Diab",
  "Pescara Circuit",
  "Circuit Bremgarten",
  "Circuit de Pedralbes",
  "Buddh International Circuit",
  "Circuit of the Americas",
  "Red Bull Ring",
  "Sochi Autodrom",
  "Baku City Circuit",
  "Autódromo Internacional do Algarve",
  "Autodromo Internazionale del Mugello",
  "Jeddah Corniche Circuit",
  "Losail International Circuit",
  "Miami International Autodrome"
];

// Populate a <select> element with all circuits
const fillCircuitSelect = (id) => {
  const select = document.getElementById(id);

  circuits.forEach((circuit) => {
    const option = document.createElement("option");
    option.value = circuit;
    option.textContent = circuit;
    select.appendChild(option);
  });
};

// Initialize all circuit dropdowns
fillCircuitSelect("circuitSelect");
fillCircuitSelect("fastestLapCircuit");
fillCircuitSelect("fastestPitCircuit");
fillCircuitSelect("slowestPitCircuit");


// =======================================================
// 2️⃣ PANEL VISIBILITY TOGGLE
// =======================================================

// Opens a selected panel and hides all others
function openPanel(panelId) {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.add("hidden");
    panel.classList.remove("show");
  });

  const panel = document.getElementById(panelId);
  panel.classList.remove("hidden");

  // Small delay for CSS transition animation
  setTimeout(() => panel.classList.add("show"), 10);
}


// =======================================================
// 3️⃣ TIME STRING → MILLISECONDS CONVERSION
// =======================================================

// Converts time formats (MM:SS.sss or HH:MM:SS) into milliseconds
function timeToMs(timeStr) {
  if (!timeStr) return 0;

  timeStr = timeStr.toString().trim().replace(",", ".");
  const parts = timeStr.split(":").map((p) => parseFloat(p));

  if (parts.some(isNaN)) return 0;

  if (parts.length === 2) {
    // MM:SS.sss
    const [minutes, seconds] = parts;
    return minutes * 60000 + seconds * 1000;
  }

  if (parts.length === 3) {
    // HH:MM:SS
    const [hours, minutes, seconds] = parts;
    return hours * 3600000 + minutes * 60000 + seconds * 1000;
  }

  return 0;
}


// =======================================================
// 4️⃣ GENERIC TIME-BASED BAR CHART LOADER
// =======================================================

let chartInstance = null;

// Fetches API data and renders a normalized bar chart
async function loadTimeChart(url, chartId, title) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data || data.length === 0) {
      return alert("No data for this selection");
    }

    // Determine which field contains time data
    const valueField = ["min_time", "max_time", "pit_time", "min"]
      .find((field) => field in data[0]);

    if (!valueField) {
      return alert("No valid time field in data");
    }

    const labels = data.map((item) => item.driver_ref);
    const originalTimes = data.map((item) => item[valueField]);
    let values = originalTimes.map(timeToMs);

    if (values.every((v) => v === 0)) {
      return alert("No valid times found for chart");
    }

    // Normalize values to emphasize small differences
    const minValue = Math.min(...values);
    values = values.map((v) => v - minValue);

    const offset = 500;     // Minimum visible bar height
    const scale = 10000;    // Amplification factor
    values = values.map((v) => (v + offset) * scale);

    const ctx = document.getElementById(chartId);

    // Destroy previous chart instance if exists
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: title,
            data: values,
            backgroundColor: "#FF0033"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: title,
            color: "#fff"
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const idx = context.dataIndex;
                return `${labels[idx]}: ${originalTimes[idx]}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#fff",
              callback: (val) => {
                const maxDiff = Math.max(...values);
                const ratio = val / maxDiff;
                const idx = Math.round(ratio * (originalTimes.length - 1));
                return originalTimes[idx] || "";
              }
            }
          },
          x: {
            ticks: { color: "#fff" }
          }
        }
      }
    });
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Error fetching data from API");
  }
}


// =======================================================
// 5️⃣ WINS-BASED CHARTS
// =======================================================

// Load wins per driver for a specific circuit
async function loadWinsByCircuit() {
  const circuit = document.getElementById("circuitSelect").value;
  if (!circuit) return alert("Select a circuit");

  const res = await fetch(
    `http://127.0.0.1:8000/wins-by-circuit?name=${encodeURIComponent(circuit)}`
  );

  const data = await res.json();
  if (!data || data.length === 0) return alert("No data for this circuit");

  const labels = data.map((d) => d.driver_ref);
  const values = data.map((d) => d.wins);

  const ctx = document.getElementById("winsCircuitChart");
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: `Wins in ${circuit}`,
          data: values,
          backgroundColor: "#FF0033"
        }
      ]
    },
    options: { responsive: true }
  });
}

// Load overall most wins chart
async function loadMostWins() {
  const res = await fetch("http://127.0.0.1:8000/most-wins");
  const data = await res.json();
  if (!data || data.length === 0) return alert("No data");

  const labels = data.map((d) => d.driver_ref);
  const values = data.map((d) => d.wins);

  const ctx = document.getElementById("mostWinsChart");
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Most Wins",
          data: values,
          backgroundColor: "#FF0033"
        }
      ]
    },
    options: { responsive: true }
  });
}


// =======================================================
// 6️⃣ TIME-BASED CHART WRAPPERS
// =======================================================

// Fastest lap chart
async function loadFastestLap() {
  const circuit = document.getElementById("fastestLapCircuit").value;
  const start = document.getElementById("fastestLapStart").value;
  const end = document.getElementById("fastestLapEnd").value;

  if (!circuit) return alert("Select a circuit");

  let url = `http://127.0.0.1:8000/fastest-lap?name=${encodeURIComponent(circuit)}`;
  if (start && end) url += `&start=${start}-01-01&end=${end}-12-31`;

  await loadTimeChart(url, "fastestLapChart", `Fastest Lap: ${circuit}`);
}

// Fastest pit stops chart
async function loadFastestPit() {
  const circuit = document.getElementById("fastestPitCircuit").value;
  const start = document.getElementById("fastestPitStart").value;
  const end = document.getElementById("fastestPitEnd").value;

  if (!circuit) return alert("Select a circuit");

  let url = `http://127.0.0.1:8000/fastest-pit?name=${encodeURIComponent(circuit)}`;
  if (start && end) url += `&start=${start}-01-01&end=${end}-12-31`;

  await loadTimeChart(url, "fastestPitChart", `Fastest Pit Stops: ${circuit}`);
}

// Slowest pit stops chart
async function loadSlowestPit() {
  const circuit = document.getElementById("slowestPitCircuit").value;
  const start = document.getElementById("slowestPitStart").value;
  const end = document.getElementById("slowestPitEnd").value;

  if (!circuit) return alert("Select a circuit");

  let url = `http://127.0.0.1:8000/slowest-pit?name=${encodeURIComponent(circuit)}`;
  if (start && end) url += `&start=${start}-01-01&end=${end}-12-31`;

  await loadTimeChart(url, "slowestPitChart", `Slowest Pit Stops: ${circuit}`);
}