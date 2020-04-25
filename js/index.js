var dateAndTime = document.querySelector(".dateAndTime h1");
var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function getDateAndTime() {
    var d = new Date();
    dateAndTime.innerHTML = d.getHours() + " : " + d.getMinutes() + " : " + d.getSeconds() + "<br/>"
        + "Today is " + weekDays[d.getDay()];
    setTimeout(getDateAndTime, 1000);
}
getDateAndTime();

var global = {}, countries = [];
function getDataWillbeShowed() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "https://api.covid19api.com/summary");
    httpRequest.send();
    httpRequest.addEventListener("readystatechange", function () {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
            global = JSON.parse(httpRequest.response).Global;
            countries = JSON.parse(httpRequest.response).Countries;
            console.log(global);
            displayGlobal(global);
            console.log(countries);
            displayCountries(countries);
        }
    });
}
getDataWillbeShowed();

var globalData = document.getElementById("globalData");
function displayGlobal(list) {
    var html = `<div class="col-lg-4 col-md-6 p-2">
                    <h1>New Confirmed<br/><span>`+ list.NewConfirmed + `</span></h1>
                </div>
                <div class="col-lg-4 col-md-6 p-2">
                    <h1>New Deaths<br/><span>`+ list.NewDeaths + `</span></h1>
                </div>
                <div class="col-lg-4 col-md-6 p-2">
                    <h1>New Recoverd<br/><span>`+ list.NewRecovered + `</span></h1>
                </div>
                <div class="col-lg-4 col-md-6 p-2">
                    <h1>Total Confirmed<br/><span>`+ list.TotalConfirmed + `</span></h1>
                </div>
                <div class="col-lg-4 col-md-6 p-2">
                    <h1>Total Deaths<br/><span>`+ list.TotalDeaths + `</span></h1>
                </div>
                <div class="col-lg-4 col-md-6 p-2">
                    <h1>Total Recovered<br/><span>`+ list.TotalRecovered + `</span></h1>
                </div>`;

    globalData.innerHTML = html;
}

var btn = document.getElementById("loadBtn");
var dataToShow = document.getElementById("dataToShow");
var dataLength = 20;
function displayCountries(list) {
    var html = "";
    for (let i = 0; i < dataLength; i++) {
        html += `<div class="col-lg-4 col-md-6 p-3">
                    <div class="eachCountry py-5">
                        <div class="row my-3">
                            <div class="col countryName text-center">
                                <h4>`+list[i].Country+`</h4>
                            </div>
                        </div>
                        <div class="row countrysData my-5 w-75 m-auto text-center">
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>New<br/>Confirmed</h5>
                                <h6>`+list[i].NewConfirmed+`</h6>
                            </div>
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>Total<br/>Confirmed</h5>
                                <h6>`+list[i].TotalConfirmed+`</h6>
                            </div>
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>New<br/>Deaths</h5>
                                <h6>`+list[i].NewDeaths+`</h6>
                            </div>
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>Total<br/>Deaths</h5>
                                <h6>`+list[i].TotalDeaths+`</h6>
                            </div>
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>New<br/>Recovered</h5>
                                <h6>`+list[i].NewRecovered+`</h6>
                            </div>
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>Total<br/>Recovered</h5>
                                <h6>`+list[i].TotalRecovered+`</h6>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
    if(dataLength < countries.length)
        btn.classList.remove("d-none");
    else{
        btn.classList.add("d-none");
    }
    dataToShow.innerHTML = html;
}
btn.addEventListener("click",function(){
    if(dataLength == 20){
        dataLength = 50;
        displayCountries(countries);
    }
    else if(dataLength == 50){
        dataLength = 100;
        displayCountries(countries);
    }
    else{
        dataLength = countries.length;
        displayCountries(countries);
    }
});


/*********************************************************************/
var searchTxt = document.getElementById("searchTxt");
var alertMessage = document.getElementById("allert");
var searchRegEx = /^[A-Z][a-z]{1,99}$/;
searchTxt.addEventListener("keyup",function(){
    if( searchRegEx.test(searchTxt.value) ){
        alertMessage.classList.add("d-none");
        btn.classList.add("d-none");
        var html = "";
        for(let i=0; i<countries.length; i++){
            if( (countries[i].Country.toLowerCase()).includes(searchTxt.value.toLowerCase()) ){

                html += `<div class="col-lg-4 col-md-6 p-3">
                    <div class="eachCountry py-5">
                        <div class="row my-3">
                            <div class="col countryName text-center">
                                <h4>`+countries[i].Country+`</h4>
                            </div>
                        </div>
                        <div class="row countrysData my-5 w-75 m-auto text-center">
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>New<br/>Confirmed</h5>
                                <h6>`+countries[i].NewConfirmed+`</h6>
                            </div>
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>Total<br/>Confirmed</h5>
                                <h6>`+countries[i].TotalConfirmed+`</h6>
                            </div>
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>New<br/>Deaths</h5>
                                <h6>`+countries[i].NewDeaths+`</h6>
                            </div>
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>Total<br/>Deaths</h5>
                                <h6>`+countries[i].TotalDeaths+`</h6>
                            </div>
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>New<br/>Recovered</h5>
                                <h6>`+countries[i].NewRecovered+`</h6>
                            </div>
                            <div class="col-lg-4 col-md-6  text-center">
                                <h5>Total<br/>Recovered</h5>
                                <h6>`+countries[i].TotalRecovered+`</h6>
                            </div>
                        </div>
                    </div>
                </div>`;

            }
        }

        dataToShow.innerHTML = html;

    }
    else if(searchTxt.value == ""){
        alertMessage.classList.add("d-none");
        displayCountries(countries);
    }
    else{
        alertMessage.classList.remove("d-none");
    }
});