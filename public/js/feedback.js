// Setting up our object and variables
const data = { happy: 0, neutral: 0, sad: 0 };
let happy = 0;
let neutral = 0;
let sad = 0;

// Making a function to post the data to the data base
function sendData() {
  x = document.getElementById("feedback-form");
  if (document.getElementById("happy").checked) {
    data.happy = 1;
    data.neutral = 0;
    data.sad = 0;
  } else if (document.getElementById("neutral").checked) {
    data.happy = 0;
    data.neutral = 1;
    data.sad = 0;
  } else if (document.getElementById("sad").checked) {
    data.happy = 0;
    data.neutral = 0;
    data.sad = 1;
  }
  // console.log(data);

  // Setting up POST method option
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  // Using fetch to post
  fetch("/api", options);
  location.reload();
}

// Calling getData3
getData3();

// Making a function to fetch data from the database and use the info to plot charts
async function getData3() {
  const response = await fetch("/api");
  const data = await response.json();
  // console.log(data[0].happy);
  for (let i = 0; i < data.length; i++) {
    happy += data[i].happy;
    neutral += data[i].neutral;
    sad += data[i].sad;
  }

  let total = happy + neutral + sad;
  let perHappy = ((happy / total) * 100).toFixed(2);
  let perNeutral = ((neutral / total) * 100).toFixed(2);
  let perSad = ((sad / total) * 100).toFixed(2);

  // Setting up common properties for all the charts
  window.Apex = {
    chart: {
      foreColor: "#ccc",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 3,
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

  // Section A: Radial Distribution
  const optionsCircle4 = {
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
    series: [perHappy, perNeutral, perSad],
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
  };

  const chartCircle4 = new ApexCharts(
    document.querySelector("#radial"),
    optionsCircle4
  );
  chartCircle4.render();

  // Section A: Doughnut of Sentiments
  const options1 = {
    series: [happy, neutral, sad],
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
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chart = new ApexCharts(document.querySelector("#pie"), options1);
  chart.render();

  // Section A: Radar of sentiments
  const options2 = {
    series: [
      {
        name: "Sentiments",
        data: [perHappy, perNeutral, perSad],
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

  const chart2 = new ApexCharts(document.querySelector("#polar"), options2);
  chart2.render();
}
