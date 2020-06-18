// Setting Properties for the Charts
window.Apex = {
  chart: {
    foreColor: "#ccc",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 2,
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

/*              TIMESERIES STATS                   */

// Setting up variable
const url = "https://api.covid19india.org/data.json";
const totalconfirmed = [];
const totaldeceased = [];
const totalrecovered = [];
const date = [];

// Calling getData function
getData();

// Making a function to fetch data from the API
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  for (let i = 0; i < data.cases_time_series.length; i++) {
    totalconfirmed.push(data.cases_time_series[i].totalconfirmed);
    totaldeceased.push(data.cases_time_series[i].totaldeceased);
    totalrecovered.push(data.cases_time_series[i].totalrecovered);
    date.push(data.cases_time_series[i].date);
  }
  // Rendering the Chart
  var chart = new ApexCharts(document.querySelector("#timeseries"), optionnew);
  chart.render();
}

// Making the Time-Series Chart
var optionnew = {
  chart: {
    height: 500,
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
  },
  series: [
    {
      name: "Confirmed",
      data: totalconfirmed,
    },
    {
      name: "Deceased",
      data: totaldeceased,
    },
    {
      name: "Recovered",
      data: totalrecovered,
    },
  ],
  title: {
    text: "Time-Series Stats",
    align: "left",
    offsetY: 25,
    offsetX: 20,
  },
  subtitle: {
    text: "No. of People",
    offsetY: 55,
    offsetX: 20,
  },
  grid: {
    show: true,
    padding: {
      bottom: 0,
    },
  },
  labels: date,
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
  xaxis: {
    type: "datetime",
    categories: date,
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

/*              STATEWISE STATS            */

// Setting up Variables
const url1 =
  "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise";
const confirmed = [];
const deaths = [];
const recovered = [];
const active = [];
const state = [];
const total = [];

// Calling getData1 function
getData1();

// Making a function to fetch data from the 2nd API
async function getData1() {
  const response = await fetch(url1);
  const data = await response.json();
  for (let i = 0; i < 37; i++) {
    confirmed.push(data.data.statewise[i].confirmed);
    deaths.push(data.data.statewise[i].deaths);
    recovered.push(data.data.statewise[i].recovered);
    active.push(data.data.statewise[i].active);
    state.push(data.data.statewise[i].state);
  }
  total.push(data.data.total.confirmed);
  total.push(data.data.total.recovered);
  total.push(data.data.total.deaths);
  total.push(data.data.total.active);
  getTotal();
}

// Making a function for displaying the stats according to the selected state
function changeText() {
  x = document.getElementById("mySelect");
  document.querySelector(".state").innerHTML = `State: ${
    state[x.selectedIndex]
  }`;
  document.querySelector(".confirmed").innerHTML = `Confirmed Cases: ${
    confirmed[x.selectedIndex]
  }`;
  document.querySelector(".deaths").innerHTML = `Deaths: ${
    deaths[x.selectedIndex]
  }`;
  document.querySelector(".recovered").innerHTML = `Recovered: ${
    recovered[x.selectedIndex]
  }`;
  document.querySelector(".active").innerHTML = `Active Cases: ${
    active[x.selectedIndex]
  }`;
}

/*                 Total Stats                   */

// Making a function for displaying the overall stats
async function getTotal() {
  document.querySelector(
    ".tconfirmed"
  ).innerHTML = ` Total Confirmed Cases:&nbsp;&nbsp;&nbsp;&nbsp;${total[0]}`;
  document.querySelector(
    ".trecovered"
  ).innerHTML = ` Total Recovered:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${total[1]}`;
  document.querySelector(
    ".tdeaths"
  ).innerHTML = ` Total Deaths:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${total[2]}`;
  document.querySelector(
    ".tactive"
  ).innerHTML = ` Total Active Cases:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${total[3]}`;
}
