// UPDATE HANDLERS

let updateSet = e => {
  const targetSet = e.target.parentNode.parentNode.dataset.id
  const trs = e.target.childNodes
  const maxes = trs[0].childNodes
  const mins =  trs[1].childNodes
  let maxArr = [], minArr = []
  for (let i = 0; i < maxes.length; i++) {
    maxArr.push(parseFloat(maxes[i].innerText))
  }
  for (let i = 0; i < mins.length; i++) {
    minArr.push(parseFloat(mins[i].innerText))
  }
  const oData = {
    min: minArr,
    max: maxArr,
    targetId: parseInt(targetSet)
  }
  let oReq = new XMLHttpRequest()
  oReq.open("POST", "/updateSet", true)
  oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  oReq.onload = oEvent => {
    if (oReq.status == 200) {
      alert("OK")
    } else {
      alert("Nepovedlo se nám poslat zprávu. Zkuste to za chvilku...")
    }
  };
  oReq.send(JSON.stringify(oData))
}

let updateName = e => {
  const targetSet = e.target.parentNode.dataset.id
  const oData = {
    name: e.target.innerText,
    targetId: parseInt(targetSet)
  }
  let oReq = new XMLHttpRequest()
  oReq.open("POST", "/updateName", true)
  oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  oReq.onload = oEvent => {
    if (oReq.status == 200) {
      alert("OK")
    } else {
      alert("Nepovedlo se nám poslat zprávu. Zkuste to za chvilku...")
    }
  };
  oReq.send(JSON.stringify(oData))
}

///

let tableExtend = (id) => {
  let sets = document.querySelectorAll(".datasetentry")
  for (let i = 0; i < sets.length; i++) {
    if (sets[i].dataset.id == id) {
      let trs = sets[i].querySelectorAll("tr")
      for (let j = 0; j < trs.length; j++) {
        trs[j].appendChild(document.createElement("td"))
      }
      sets[i].querySelector("tbody").focus()
      sets[i].querySelector("tbody").blur()
    }
  }
}

let tableShrink = (id) => {
  let sets = document.querySelectorAll(".datasetentry")
  for (let i = 0; i < sets.length; i++) {
    if (sets[i].dataset.id == id) {
      let trs = sets[i].querySelectorAll("tr")
      for (let j = 0; j < trs.length; j++) {
        trs[j].removeChild(trs[j].querySelector("td:last-child"))
      }
      sets[i].querySelector("tbody").focus()
      sets[i].querySelector("tbody").blur()
    }
  }
}

let newTable = () => {
  let oReq = new XMLHttpRequest()
  oReq.open("POST", "/newSet", true)
  oReq.onload = oEvent => {
    if (oReq.status == 200) {
      alert("OK")
    } else {
      alert("Nepovedlo se nám poslat zprávu. Zkuste to za chvilku...")
    }
  }
  oReq.send()
  window.location.reload()
}

let datatables = document.querySelectorAll(".datasetentry tbody")
for (let i = 0; i < datatables.length; i++) {
  datatables[i].addEventListener("blur", updateSet)
}

let datanames = document.querySelectorAll(".datasetentry h3")
for (let i = 0; i < datanames.length; i++) {
  datanames[i].addEventListener("blur", updateName)
}
