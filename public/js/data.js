/* Generated by Babel */
// UPDATE HANDLERS

"use strict";

var updateSet = function updateSet(e) {
  var targetSet = e.target.parentNode.parentNode.dataset.id;
  var trs = e.target.childNodes;
  var maxes = trs[0].childNodes;
  var mins = trs[1].childNodes;
  var maxArr = [],
      minArr = [];
  for (var i = 0; i < maxes.length; i++) {
    maxArr.push(parseFloat(maxes[i].innerText));
  }
  for (var i = 0; i < mins.length; i++) {
    minArr.push(parseFloat(mins[i].innerText));
  }
  var oData = {
    min: minArr,
    max: maxArr,
    targetId: parseInt(targetSet)
  };
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/updateSet", true);
  oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  oReq.onload = function (oEvent) {
    if (oReq.status == 200) {
      alert("OK");
    } else {
      alert("Nepovedlo se nám poslat zprávu. Zkuste to za chvilku...");
    }
  };
  oReq.send(JSON.stringify(oData));
};

var updateName = function updateName(e) {
  var targetSet = e.target.parentNode.dataset.id;
  var oData = {
    name: e.target.innerText,
    targetId: parseInt(targetSet)
  };
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/updateName", true);
  oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  oReq.onload = function (oEvent) {
    if (oReq.status == 200) {
      alert("OK");
    } else {
      alert("Nepovedlo se nám poslat zprávu. Zkuste to za chvilku...");
    }
  };
  oReq.send(JSON.stringify(oData));
};

///

var tableExtend = function tableExtend(id) {
  var sets = document.querySelectorAll(".datasetentry");
  for (var i = 0; i < sets.length; i++) {
    if (sets[i].dataset.id == id) {
      var trs = sets[i].querySelectorAll("tr");
      for (var j = 0; j < trs.length; j++) {
        trs[j].appendChild(document.createElement("td"));
      }
      sets[i].querySelector("tbody").focus();
      sets[i].querySelector("tbody").blur();
    }
  }
};

var tableShrink = function tableShrink(id) {
  var sets = document.querySelectorAll(".datasetentry");
  for (var i = 0; i < sets.length; i++) {
    if (sets[i].dataset.id == id) {
      var trs = sets[i].querySelectorAll("tr");
      for (var j = 0; j < trs.length; j++) {
        trs[j].removeChild(trs[j].querySelector("td:last-child"));
      }
      sets[i].querySelector("tbody").focus();
      sets[i].querySelector("tbody").blur();
    }
  }
};

var newTable = function newTable() {
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/newSet", true);
  oReq.onload = function (oEvent) {
    if (oReq.status == 200) {
      alert("OK");
    } else {
      alert("Nepovedlo se nám poslat zprávu. Zkuste to za chvilku...");
    }
  };
  oReq.send();
  window.location.reload();
};

var datatables = document.querySelectorAll(".datasetentry tbody");
for (var i = 0; i < datatables.length; i++) {
  datatables[i].addEventListener("blur", updateSet);
}

var datanames = document.querySelectorAll(".datasetentry h3");
for (var i = 0; i < datanames.length; i++) {
  datanames[i].addEventListener("blur", updateName);
}