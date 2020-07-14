// Setting up some base properties for all the charts
window.Apex = {
  chart: {
    foreColor: "#ccc",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: "dark",
  },
  grid: {
    borderColor: "#535A6C",
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
};

// Setting up variables

const delposz = [];
const delneuz = [];
const delnegz = [];

const mumposz = [];
const mumneuz = [];
const mumnegz = [];

const chenposz = [];
const chenneuz = [];
const chennegz = [];

const kolposz = [];
const kolneuz = [];
const kolnegz = [];

const hydposz = [];
const hydneuz = [];
const hydnegz = [];

const bangposz = [];
const bangneuz = [];
const bangnegz = [];

const dates = [];

// Calling chartIt2
chartIt2();

// getData6 Function: This function fetches the data from the CSV file for the visualization and stores in above arrays
async function getData6() {
  // Fetching the tabular CSV data
  const response = await fetch(
    "https://raw.githubusercontent.com/SmartPracticeschool/SBSPS-Challenge-2671-Sentiment-analysis-of-COVID-19-tweets-Visualization-dashboard/master/public/data/VData.csv"
  );
  const data = await response.text();

  // Parsing the CSV tabular data into arrays
  const table = data.split("\n").slice(1);
  for (let i = 0; i < 7; i++) {
    const columns = table[i].split(",");
    // Dates
    const date = columns[1];
    dates.push(date);
    // Delhi Sentiments
    const delpos = columns[6];
    delposz.push(delpos);
    const delneu = columns[7];
    delneuz.push(delneu);
    const delneg = columns[8];
    delnegz.push(delneg);
    // Mumbai Sentiments
    const mumpos = columns[9];
    mumposz.push(mumpos);
    const mumneu = columns[10];
    mumneuz.push(mumneu);
    const mumneg = columns[11];
    mumnegz.push(mumneg);
    // Chennai Sentiment
    const chenpos = columns[12];
    chenposz.push(chenpos);
    const chenneu = columns[13];
    chenneuz.push(chenneu);
    const chenneg = columns[14];
    chennegz.push(chenneg);
    // Kolkata Sentiment
    const kolpos = columns[15];
    kolposz.push(kolpos);
    const kolneu = columns[16];
    kolneuz.push(kolneu);
    const kolneg = columns[17];
    kolnegz.push(kolneg);
    // Hyderabad Sentiment
    const hydpos = columns[18];
    hydposz.push(hydpos);
    const hydneu = columns[19];
    hydneuz.push(hydneu);
    const hydneg = columns[20];
    hydnegz.push(hydneg);
    // Bangalore Sentiment
    const bangpos = columns[21];
    bangposz.push(bangpos);
    const bangneu = columns[22];
    bangneuz.push(bangneu);
    const bangneg = columns[23];
    bangnegz.push(bangneg);
  }
}

// chartIt2 Function: This function render the charts using the data fetched using getData6
async function chartIt2() {
  await getData6();

  sparks4.render();
  sparks5.render();
  sparks6.render();

  chartBarLoco.render();

  chartLocoLinez.render();
}

// Section B: Sparkboxes
var spark4 = {
  chart: {
    id: "spark4",
    group: "spark",
    type: "line",
    height: 160,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    },
  },
  yaxis: {
    labels: {
      minWidth: 40,
    },
  },
  series: [
    {
      data: delposz,
    },
  ],
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: 0,
  },
  grid: {
    padding: {
      top: 20,
      bottom: 10,
      left: 110,
    },
  },
  colors: ["#fff"],
  tooltip: {
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return "";
        },
      },
    },
  },
};

var spark5 = {
  chart: {
    id: "spark5",
    group: "spark",
    type: "line",
    height: 160,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    },
  },
  yaxis: {
    labels: {
      minWidth: 40,
    },
  },
  series: [
    {
      data: delneuz,
    },
  ],
  stroke: {
    curve: "smooth",
  },
  grid: {
    padding: {
      top: 20,
      bottom: 10,
      left: 110,
    },
  },
  markers: {
    size: 0,
  },
  colors: ["#fff"],
  tooltip: {
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return "";
        },
      },
    },
  },
};

var spark6 = {
  chart: {
    id: "spark6",
    group: "spark",
    type: "line",
    height: 160,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    },
  },
  yaxis: {
    labels: {
      minWidth: 40,
    },
  },
  series: [
    {
      data: delnegz,
    },
  ],
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: 0,
  },
  grid: {
    padding: {
      top: 20,
      bottom: 10,
      left: 110,
    },
  },
  colors: ["#fff"],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return "";
        },
      },
    },
  },
};

const sparks4 = new ApexCharts(document.querySelector("#spark4"), spark4);
const sparks5 = new ApexCharts(document.querySelector("#spark5"), spark5);
const sparks6 = new ApexCharts(document.querySelector("#spark6"), spark6);

// Section C: Datewise analysis of last 7 days BAR GRAPH according to the location
var optionsBarLoco = {
  chart: {
    height: 380,
    type: "bar",
    stacked: true,
  },
  plotOptions: {
    bar: {
      columnWidth: "30%",
      horizontal: false,
    },
  },
  series: [
    {
      name: "POSITIVE",
      data: delposz,
    },
    {
      name: "NEUTRAL",
      data: delneuz,
    },
    {
      name: "NEGATIVE",
      data: delnegz,
    },
  ],
  title: {
    text: "Datewise Analysis of 7 days ( dd/MM/yyyy )",
    align: "left",
    offsetY: 0,
  },
  xaxis: {
    categories: dates,
  },
  fill: {
    opacity: 1,
  },
};

var chartBarLoco = new ApexCharts(
  document.querySelector("#loco-datewise"),
  optionsBarLoco
);

// Section D: Datewise analysis of last 7 days LINE GRAPH according to the location

var optionsLocoLinez = {
  chart: {
    height: 328,
    type: "line",
    zoom: {
      enabled: false,
    },
    dropShadow: {
      enabled: true,
      top: 3,
      left: 2,
      blur: 4,
      opacity: 1,
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },

  //colors: ["#3F51B5", '#2196F3'],
  series: [
    {
      name: "Positive",
      data: delposz,
    },
    {
      name: "Neutral",
      data: delneuz,
    },
    {
      name: "Negative",
      data: delnegz,
    },
  ],
  title: {
    text: "Datewise Analysis of 7 days ( dd/MM/yyyy )",
    align: "left",
    offsetY: 0,
  },
  markers: {
    size: 6,
    strokeWidth: 0,
    hover: {
      size: 9,
    },
  },
  grid: {
    show: true,
    padding: {
      bottom: 0,
    },
  },
  labels: dates,
  xaxis: {
    tooltip: {
      enabled: false,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    offsetY: -20,
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

window.chartLocoLinez = new ApexCharts(
  document.querySelector("#loco-linez"),
  optionsLocoLinez
);

// Function to change the data to data of Delhi
function changeToDelhi() {
  chartBarLoco.updateSeries([
    {
      name: "POSITIVE",
      data: delposz,
    },
    {
      name: "NEUTRAL",
      data: delneuz,
    },
    {
      name: "NEGATIVE",
      data: delnegz,
    },
  ]);
  sparks4.updateSeries([
    {
      data: delposz,
    },
  ]);
  sparks5.updateSeries([
    {
      data: delneuz,
    },
  ]);
  sparks6.updateSeries([
    {
      data: delnegz,
    },
  ]);
  chartLocoLinez.updateSeries([
    {
      name: "Positive",
      data: delposz,
    },
    {
      name: "Neutral",
      data: delneuz,
    },
    {
      name: "Negative",
      data: delnegz,
    },
  ]);
  document.getElementById("selectedloc").textContent =
    "Selected Location: Delhi";
}

// Function to change the data to data of Mumbai
function changeToMumbai() {
  chartBarLoco.updateSeries([
    {
      name: "POSITIVE",
      data: mumposz,
    },
    {
      name: "NEUTRAL",
      data: mumneuz,
    },
    {
      name: "NEGATIVE",
      data: mumnegz,
    },
  ]);
  sparks4.updateSeries([
    {
      data: mumposz,
    },
  ]);
  sparks5.updateSeries([
    {
      data: mumneuz,
    },
  ]);
  sparks6.updateSeries([
    {
      data: mumnegz,
    },
  ]);
  chartLocoLinez.updateSeries([
    {
      name: "Positive",
      data: mumposz,
    },
    {
      name: "Neutral",
      data: mumneuz,
    },
    {
      name: "Negative",
      data: mumnegz,
    },
  ]);
  document.getElementById("selectedloc").textContent =
    "Selected Location: Mumbai";
}

// Function to change the data to data of Chennai
function changeToChennai() {
  chartBarLoco.updateSeries([
    {
      name: "POSITIVE",
      data: chenposz,
    },
    {
      name: "NEUTRAL",
      data: chenneuz,
    },
    {
      name: "NEGATIVE",
      data: chennegz,
    },
  ]);
  sparks4.updateSeries([
    {
      data: chenposz,
    },
  ]);
  sparks5.updateSeries([
    {
      data: chenneuz,
    },
  ]);
  sparks6.updateSeries([
    {
      data: chennegz,
    },
  ]);
  chartLocoLinez.updateSeries([
    {
      name: "Positive",
      data: chenposz,
    },
    {
      name: "Neutral",
      data: chenneuz,
    },
    {
      name: "Negative",
      data: chennegz,
    },
  ]);
  document.getElementById("selectedloc").textContent =
    "Selected Location: Chennai";
}

// Function to change the data to data of Kolkata
function changeToKolkata() {
  chartBarLoco.updateSeries([
    {
      name: "POSITIVE",
      data: kolposz,
    },
    {
      name: "NEUTRAL",
      data: kolneuz,
    },
    {
      name: "NEGATIVE",
      data: kolnegz,
    },
  ]);
  sparks4.updateSeries([
    {
      data: kolposz,
    },
  ]);
  sparks5.updateSeries([
    {
      data: kolneuz,
    },
  ]);
  sparks6.updateSeries([
    {
      data: kolnegz,
    },
  ]);
  chartLocoLinez.updateSeries([
    {
      name: "Positive",
      data: kolposz,
    },
    {
      name: "Neutral",
      data: kolneuz,
    },
    {
      name: "Negative",
      data: kolnegz,
    },
  ]);
  document.getElementById("selectedloc").textContent =
    "Selected Location: Kolkata";
}

// Function to change the data to data of Hyderabad
function changeToHyd() {
  chartBarLoco.updateSeries([
    {
      name: "POSITIVE",
      data: hydposz,
    },
    {
      name: "NEUTRAL",
      data: hydneuz,
    },
    {
      name: "NEGATIVE",
      data: hydnegz,
    },
  ]);
  sparks4.updateSeries([
    {
      data: hydposz,
    },
  ]);
  sparks5.updateSeries([
    {
      data: hydneuz,
    },
  ]);
  sparks6.updateSeries([
    {
      data: hydnegz,
    },
  ]);
  chartLocoLinez.updateSeries([
    {
      name: "Positive",
      data: hydposz,
    },
    {
      name: "Neutral",
      data: hydneuz,
    },
    {
      name: "Negative",
      data: hydnegz,
    },
  ]);
  document.getElementById("selectedloc").textContent =
    "Selected Location: Hyderabad";
}

// Function to change the data to data of Kolkata
function changeToBang() {
  chartBarLoco.updateSeries([
    {
      name: "POSITIVE",
      data: bangposz,
    },
    {
      name: "NEUTRAL",
      data: bangneuz,
    },
    {
      name: "NEGATIVE",
      data: bangnegz,
    },
  ]);
  sparks4.updateSeries([
    {
      data: bangposz,
    },
  ]);
  sparks5.updateSeries([
    {
      data: bangneuz,
    },
  ]);
  sparks6.updateSeries([
    {
      data: bangnegz,
    },
  ]);
  chartLocoLinez.updateSeries([
    {
      name: "Positive",
      data: bangposz,
    },
    {
      name: "Neutral",
      data: bangneuz,
    },
    {
      name: "Negative",
      data: bangnegz,
    },
  ]);
  document.getElementById("selectedloc").textContent =
    "Selected Location: Bangalore";
}
