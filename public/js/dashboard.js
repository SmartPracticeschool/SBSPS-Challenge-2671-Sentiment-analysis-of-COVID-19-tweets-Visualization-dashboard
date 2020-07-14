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

// Setting Up Variables
const dwposz = [];
const dwneuz = [];
const dwnegz = [];
const avgsent = [];
const dates = [];

// Calling ChartIt Function
chartIt();

// getData5 Function: This function is used to fetch the csv data for the visualisation and stored in the above variables
async function getData5() {
  // Fetching response
  const response = await fetch(
    "https://raw.githubusercontent.com/SmartPracticeschool/SBSPS-Challenge-2671-Sentiment-analysis-of-COVID-19-tweets-Visualization-dashboard/master/public/data/VData.csv"
  );
  const data = await response.text();

  // Parsing the tabular data into arrays
  const table = data.split("\n").slice(1);
  for (let i = 0; i < 7; i++) {
    const columns = table[i].split(",");
    const date = columns[1];
    dates.push(date);
    const dwpos = columns[2];
    dwposz.push(dwpos);
    const dwneu = columns[3];
    dwneuz.push(dwneu);
    const dwneg = columns[4];
    dwnegz.push(dwneg);
    const avg = Number(columns[5]).toFixed(3);
    avgsent.push(avg);
  }
}

// chartIt Function: This function is used to render charts for the data that we fetched from the getData5 function
async function chartIt() {
  await getData5();

  let mxavg = Math.max(...avgsent);
  let mnavg = Math.min(...avgsent);
  // SECTION A: SPARKBOXES
  // Positive Sparkbox
  var spark1 = {
    chart: {
      id: "spark1",
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
        data: dwposz,
      },
    ],
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            height: 90,
          },
        },
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

  // Neutral Sparkbox
  var spark2 = {
    chart: {
      id: "spark2",
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
        data: dwneuz,
      },
    ],
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            height: 90,
          },
        },
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

  // Negative Sparkbox
  var spark3 = {
    chart: {
      id: "spark3",
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
        data: dwnegz,
      },
    ],
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            height: 90,
          },
        },
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
  // Rendering the charts in their respective divs
  new ApexCharts(document.querySelector("#spark1"), spark1).render();
  new ApexCharts(document.querySelector("#spark2"), spark2).render();
  new ApexCharts(document.querySelector("#spark3"), spark3).render();

  // SECTION B: BAR GRAPH
  var optionsBar = {
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
        data: dwposz,
      },
      {
        name: "NEUTRAL",
        data: dwneuz,
      },
      {
        name: "NEGATIVE",
        data: dwnegz,
      },
    ],
    title: {
      text: "Datewise Sentiment Analysis of 7 days ( dd/MM/yyyy )",
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

  var chartBar = new ApexCharts(
    document.querySelector("#datewise"),
    optionsBar
  );
  chartBar.render();

  // Section C: Average Sentiments Datewise
  var optionsavg = {
    series: [
      {
        name: "Sentiment",
        data: avgsent,
      },
    ],
    title: {
      text: "Average Sentiment Analysis of 7 days ( dd/MM/yyyy )",
      align: "left",
      offsetY: 0,
    },
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: mnavg,
              to: mnavg / 2,
              color: "#F15B46",
            },
            {
              from: mnavg / 2 + 0.0001,
              to: 0,
              color: "#FEB019",
            },
            {
              from: 0.0001,
              to: mxavg / 2,
              color: "#1BBEE3",
            },
            {
              from: mxavg / 2 + 0.0001,
              to: mxavg,
              color: "#1A80D9",
            },
          ],
        },
        columnWidth: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      title: {
        text: "Average Sentiment",
      },
      tickAmount: 2,
      min: -(mxavg + 0.03),
      max: mxavg + 0.03,
    },
    xaxis: {
      categories: dates,
      labels: {
        rotate: -90,
      },
    },
    tooltip: {
      x: {
        format: "yyyy/MM/dd HH:mm",
      },
    },
  };

  var chart3 = new ApexCharts(document.querySelector("#average"), optionsavg);
  chart3.render();

  // Section D: Datewise analysis 7 days LINE GRAPH
  var optionsLinez = {
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
        data: dwposz,
      },
      {
        name: "Neutral",
        data: dwneuz,
      },
      {
        name: "Negative",
        data: dwnegz,
      },
    ],
    title: {
      text: "Datewise Sentiment Analysis of 7 days ( dd/MM/yyyy )",
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

  var chartLinez = new ApexCharts(
    document.querySelector("#linez"),
    optionsLinez
  );
  chartLinez.render();
}
