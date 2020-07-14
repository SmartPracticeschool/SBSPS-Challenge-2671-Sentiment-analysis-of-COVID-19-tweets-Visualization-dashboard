// Setting up some common properties for all the charts
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

// Setting up Variables
let hap;
let neu;
let sads;

let haparr = [];
let neuarr = [];
let sadsarr = [];
let timez = [];
let secs = ["NOW", "-20s", "-40s", "-60s", "-80s", "-100s", "-120s"];

// Calling chartIt3 function
chartIt3();

// refreshData Function: This function is used to refresh the data after fetching the new LIVE data
async function refreshData() {
  await getTwit();
  chartCircle1.updateSeries([hap, neu, sads]);
  chartz1.updateSeries([
    {
      name: "Sentiments",
      data: [hap, neu, sads],
    },
  ]);
  chartz.updateSeries([hap, neu, sads]);
  chartLinezLive.updateSeries([
    {
      name: "Positive",
      data: haparr,
    },
    {
      name: "Neutral",
      data: neuarr,
    },
    {
      name: "Negative",
      data: sadsarr,
    },
  ]);
}

// getTwit Function: This function fetches the LIVE analysed tweets from backend stores them in the above variables
async function getTwit() {
  const response = await fetch("/twits");
  const data = await response.json();
  // console.log(data);
  hap = data.happy;
  neu = data.neutral;
  sads = data.sad;
  if (haparr.length < 7) {
    haparr.push(hap);
    neuarr.push(neu);
    sadsarr.push(sads);
    timez.unshift(secs.shift());
  } else if ((haparr.length = 7)) {
    haparr.shift();
    neuarr.shift();
    sadsarr.shift();
    haparr.push(hap);
    neuarr.push(neu);
    sadsarr.push(sads);
  }
}

// Section B: LIVE Radial Distribution
const optionsCircle1 = {
  chart: {
    type: "radialBar",
    height: 350,
    width: 380,
  },
  plotOptions: {
    radialBar: {
      size: undefined,
      inverseOrder: true,
      hollow: {
        margin: 5,
        size: "48%",
        background: "transparent",
      },
      track: {
        show: false,
      },
      startAngle: -180,
      endAngle: 180,
    },
  },
  stroke: {
    lineCap: "round",
  },
  series: [hap, neu, sads],
  title: {
    text: "Radial Distribution",
    align: "left",
    offsetY: 30,
    offsetX: 20,
  },
  labels: ["Positive", "Neutral", "Negative"],
  legend: {
    show: true,
    floating: true,
    position: "right",
    offsetX: 70,
    offsetY: 240,
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: {
          height: 290,
        },
        legend: {
          show: true,
          floating: true,
          position: "bottom",
          offsetX: 0,
          offsetY: 0,
        },
        title: {
          align: "center",
          offsetY: 0,
          offsetX: 0,
        },
      },
    },
  ],
};

const chartCircle1 = new ApexCharts(
  document.querySelector("#radial-live"),
  optionsCircle1
);

// Section B: LIVE Doughnut of Sentiments
const optionz = {
  series: [hap, neu, sads],
  chart: {
    width: 420,
    type: "donut",
  },
  title: {
    text: "Doughnut of the sentiments",
    align: "left",
    offsetY: 0,
  },
  labels: ["Positive", "Neutral", "Negative"],
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: "gradient",
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: {
          height: 290,
        },
        legend: {
          position: "bottom",
          offsetX: 0,
        },
        title: {
          align: "center",
          offsetY: 0,
        },
      },
    },
  ],
};

const chartz = new ApexCharts(document.querySelector("#pie-live"), optionz);

// Section B: LIVE Radar of sentiments
const optionz1 = {
  series: [
    {
      name: "Sentiments",
      data: [hap, neu, sads],
    },
  ],
  chart: {
    height: 350,
    type: "radar",
  },
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    radar: {
      size: 140,
      polygons: {
        strokeColors: "palevioletred",
        fill: {
          colors: ["#343e59", "#2b2d3e"],
        },
      },
    },
  },
  title: {
    text: "Radar of sentiments",
  },
  colors: ["#FF4560"],
  markers: {
    size: 4,
    colors: ["#fff"],
    strokeColor: "#FF4560",
    strokeWidth: 2,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val;
      },
    },
  },
  xaxis: {
    categories: ["POSITIVE", "NEUTRAL", "NEGATIVE"],
  },
  yaxis: {
    tickAmount: 7,
    labels: {
      formatter: function (val, i) {
        if (i % 2 === 0) {
          return val;
        } else {
          return "";
        }
      },
    },
  },
};

const chartz1 = new ApexCharts(document.querySelector("#polar-live"), optionz1);

// Section C: LIVE Sentiment Analysis
var optionsLinezLive = {
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
      data: haparr,
    },
    {
      name: "Neutral",
      data: neuarr,
    },
    {
      name: "Negative",
      data: sadsarr,
    },
  ],
  title: {
    text: "LIVE sentiment analysis of last 120 seconds",
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
  labels: timez,
  xaxis: {
    tooltip: {
      enabled: false,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
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

var chartLinezLive = new ApexCharts(
  document.querySelector("#linez-live"),
  optionsLinezLive
);

// function chartIt3 : This function uses the data stored in the variables to render charts
async function chartIt3() {
  await getTwit();

  chartCircle1.render();

  chartz.render();

  chartz1.render();

  chartLinezLive.render();
  refreshData();
  setInterval(refreshData, 1000 * 20);
}
