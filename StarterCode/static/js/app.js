// from data.js
let tableData = data;


// Fill the table  ///////////////////////////////////////////

let tbody = d3.select("tbody");


function htmlTable(ufoSighting) 
{
  ufoSighting.forEach(ufoSightings => 
    {
    let row = tbody.append("tr");
    Object.entries(ufoSightings).forEach(([key, value]) => 
      {
      var cell = row.append("td");
      cell.text(value);
      })
    })
}


htmlTable(tableData);

  

  // ///////////////////////////////////////////////////////////


// Pull unique values of the UFO Shapes from the table.
// https://flaviocopes.com/how-to-get-unique-properties-of-object-in-array/

let ufoShapes = [...new Set(tableData.map(tableData => tableData.shape))];
console.log(ufoShapes);

// Use Unique values of the UFO Shapes above to populate a drop-down
// menu for the filter.
// https://www.youtube.com/watch?v=HMehtL39VUQ&t=365s

let shape = document.getElementById("shape");

for (let i = 0; i < ufoShapes.length; i++) 
{
  let option = document.createElement("option"),
    txt = document.createTextNode(ufoShapes[i]);
  option.appendChild(txt);
  shape.insertBefore(option, shape.lastChild);
}

// /////////////////////////////////////////////////////////////////////


let filterSubmit = d3.select("#filter-btn");

filterSubmit.on("click", function () 
{
  tbody.html("");
  // Disable page from refreshing
  d3.event.preventDefault();
  
  // Select  inputs
  let inputDate = d3.select("#datetime");
  let inputCity = d3.select("#city");
  let inputState = d3.select("#state");
  let inputCountry = d3.select("#country");
  let inputShape = d3.select("#shape");

  // Obtain search values
  let filterDate = inputDate.property("value");
  let filterCity = inputCity.property("value");
  let filterState = inputState.property("value");
  let filterCountry = inputCountry.property("value");
  let filterShape = inputShape.property("value");

    filteredTableData = tableData.filter(function(ufoInfo){
      let filteredDate = ufoInfo.datetime;
      let filteredCity = ufoInfo.city;
      let filteredState = ufoInfo.state;
      let filteredCountry = ufoInfo.country;
      let filteredShape = ufoInfo.shape;

      if (
        (filteredDate === filterDate || filterDate === "" ) &&
        (filteredCity=== filterCity || filterCity === "") &&
        (filteredState === filterState || filterState === "") &&
        (filteredCountry === filterCountry || filterCountry === "") &&
        (filteredShape === filterShape || filterShape === "")
     ) {
          return true;
       }
       return false;
      });

    htmlTable(filteredTableData);


});


