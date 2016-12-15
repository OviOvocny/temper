let useCelsius = localStorage.getItem("celsius") !== null ? localStorage.getItem("celsius") === "true" : true
let temper = {
  displayUnits: useCelsius ? "C" : "F",
  toFahrenheit: t => Math.round(t*9/5+32),
  toCelsius: t => Math.round((t-32)*5/9)
}

let convertAll = (toCelsius) => {
  if (toCelsius) {
    dataset.min = dataset.min.map(temper.toCelsius)
    dataset.max = dataset.max.map(temper.toCelsius)
  } else {
    dataset.min = dataset.min.map(temper.toFahrenheit)
    dataset.max = dataset.max.map(temper.toFahrenheit)
  }
}

if (!useCelsius) {
  convertAll(false)
}

let updateAvg = () => {
  dataset.avg = dataset.min.map( (v, i) => (v+dataset.max[i])/2 )
}
updateAvg()


// chart config

Chart.defaults.global.defaultFontFamily = "Fira Sans"
Chart.defaults.global.defaultFontColor = "white"
Chart.defaults.global.defaultFontSize = 16
Chart.defaults.global.elements.line.tension = 0.4

let labels = []
for (let i = 1; i <= Math.max(dataset.min.length, dataset.max.length); i++) {
  labels.push(`Den ${i}`)
}

let gdmax = chartCanvas.getContext("2d").createLinearGradient(0,0,0,chartCanvas.width)
gdmax.addColorStop(0,"hsla(10,80%,70%,.2)")
gdmax.addColorStop(1,"hsla(10,80%,50%,0)")
let gdmin = chartCanvas.getContext("2d").createLinearGradient(0,0,0,chartCanvas.width)
gdmin.addColorStop(0,"hsla(210,80%,70%,.4)")
gdmin.addColorStop(1,"hsla(210,80%,50%,0)")

let tempChart = new Chart(chartCanvas, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Maximum',
      data: dataset.max,
      borderColor: "hsl(10, 80%, 70%)",
      backgroundColor: gdmax
    }, {
      label: 'Průměr',
      data: dataset.avg,
      borderColor: "white",
      backgroundColor: "transparent"
    }, {
      label: 'Minimum',
      data: dataset.min,
      borderColor: "hsl(210, 80%, 70%)",
      backgroundColor: gdmin
    }]
  },
  options: {
    hover: {
      mode: "x",
      intersect: false
    },
    tooltips: {
      mode: "x",
      intersect: false,
      bodySpacing: 10,
      titleMarginBottom: 15,
      yPadding: 10,
      displayColors: false,
      callbacks: {
        label: (i,d) => `${tempChart.data.datasets[i.datasetIndex].label}: ${i.yLabel}°${temper.displayUnits}`
      }
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        hoverRadius: 8,
        radius: 5,
        borderWidth: 4,
        pointStyle: "rectRot"
      }
    },
    scales: {
      yAxes: [{
        gridLines: {
          color: "rgba(255,255,255,.2)",
          zeroLineColor: "rgba(255,255,255,.6)"
        }
      }],
      xAxes: [{
        gridLines: {
          color: "rgba(255,255,255,.2)"
        }
      }]
    }
  }
})

switchBtn.addEventListener("click", () => {
  useCelsius = !useCelsius
  temper.displayUnits = useCelsius ? "C" : "F"
  convertAll(useCelsius)
  updateAll()
})

datasetselect.addEventListener("change", (e) => {
  window.location.pathname = `/temp/${datasetselect[datasetselect.selectedIndex].value}`
})

let updateAll = () => {
  dataset.max.forEach((v,i) => {
    if (v < dataset.min[i]) dataset.min[i] = v
  })
  dataset.min.forEach((v,i) => {
    if (v > dataset.max[i]) dataset.max[i] = v
  })
  updateAvg()
  tempChart.data.datasets[0].data = dataset.max
  tempChart.data.datasets[1].data = dataset.avg
  tempChart.data.datasets[2].data = dataset.min
  tempChart.update()
}
