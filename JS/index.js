let myDiv = document.querySelector(".info-div");
let mySelect = document.querySelector(".my-select");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e7332490d3msh6210112e8d2b2eep1b08b5jsnf0df3899b77d",
    "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
  },
};

fetch("https://covid-193.p.rapidapi.com/countries", options)
  .then((response) => response.json())
  .then((data) => {
    let myCountries = data.response;
    myCountries.forEach((country) => {
      mySelect.innerHTML += `<option>${country}</option>`;
    });

    mySelect.addEventListener("change", () => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e7332490d3msh6210112e8d2b2eep1b08b5jsnf0df3899b77d",
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        },
      };

      fetch("https://covid-193.p.rapidapi.com/statistics", options)
        .then((response) => response.json())
        .then((statistics) => {
          let myCities = statistics.response;
          console.log(myCities);

          myCities.forEach((info) => {
            let myInfo = info.cases;
            let totalCases = myInfo.total;
            let activeCases = myInfo.active;
            let recoveredCases = myInfo.recovered;
            let newCases = myInfo.new;
            let criticalCases = myInfo.critical;
            let fatals = info.deaths;
            let totalDeaths = fatals.total;
            let tests = myInfo.tests;
            let totalTests = myInfo.total;

            console.log();

            if (mySelect.value == `${info.country}`) {
              let showInfo = `
              <div class="container mt-5">
               <div class="row mx-auto mb-5">
               <div class="col-md-4"><p>City: ${info.country}</p></div>
               <div class="col-md-4"><p>Continent: ${info.continent}</p></div>
               <div class="col-md-4"><p>Population: ${info.population}</p></div>
               </div>
               <div class="row mx-auto mb-5">
               <div class="col-md-4"><p>Total Cases: ${totalCases}</p></div>
               <div class="col-md-4"><p>Active Cases: ${activeCases}</p></div>
               <div class="col-md-4"><p>New Cases: ${newCases}</p></div>
               </div>
               <div class="row mx-auto mb-5">
               <div class="col-md-4"><p>Critical Cases: ${criticalCases}</p></div>
               <div class="col-md-4"><p>Recovered Cases: ${recoveredCases}</p></div>
               <div class="col-md-4"><p>Total Deaths : ${totalDeaths}</p></div>
               </div>
               <div class="row mx-auto d-flex justify-content-center">
               <div class="col-md-4"><p>Total Tests: ${totalTests}</p></div>
               </div>
              </div>
              
              `;
              myDiv.innerHTML = showInfo;
            }
          });
        });
    });
  });
