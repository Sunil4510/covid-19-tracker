import React, { useEffect, useState } from 'react'
import "./App.css"
import {CardContent, FormControl,MenuItem,Select,Card} from "@material-ui/core"
import Infobox from './Components/js/Infobox'
import Map from './Components/js/Map'
import Table from './Components/js/Table'
import { sortData } from './Components/js/utils'
import LineGraph from './Components/js/LineGraph'
import "leaflet/dist/leaflet.css"


const App = () => {
  //https://disease.sh/v3/covid-19/all
  
const [countries, setCountries] = useState([]);
const [country, setcountry] = useState("worldwide");
const [countryInfo, setcountryInfo] = useState({})
const [countryTable, setcountryTable] = useState([]);
const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
const [mapZoom, setMapZoom] = useState(3);
const [mapCountries,setMapCountries] = useState([]);
const [casesType,setcasesType] = useState("cases");

  useEffect(() => {
   fetch("https://disease.sh/v3/covid-19/all")
   .then((res)=>res.json())
   .then(data=>{
     setcountryInfo(data);
   })
  }, [])


    useEffect(() => {
      const getCountriesData = async() => {
         await fetch("https://disease.sh/v3/covid-19/countries")
         .then((res)=> res.json())
         .then((data) => {
           //console.log(data);
           const countries = data.map((country)=>({
             name: country.country,
             value: country.countryInfo.iso3,
           }));
          
//iso2 is code of countries like India=(ind),united States America = (USA)
          const sortedData = sortData(data);           
          setcountryTable(sortedData); 
            setMapCountries(data);
           setCountries(countries);
         });
      };
      getCountriesData();
    }, []);
    const onCountryChange = async (e) => {
      const countryCode = e.target.value;
        setcountry(countryCode);

        const url = countryCode==="worldwide"?'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
        .then((res)=>res.json())
        .then(data=>{
          setcountry(countryCode);
          setcountryInfo(data);
          if(countryCode==="worldwide"){
            setMapCenter({ lat: 34.80746, lng: -40.4796 });
            setMapZoom(3);
          }else{
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
          }
        })

    }
  return (
    <div className="app">
      <div className="app_left">
      <div className="app_header">
        {/* Header */}
      {/* Title + Select input dropdown field */}
        <h1>COVID-19 TRACKER </h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
            {/*loop through all the countries and show a dropdown list */}
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country)=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))  

            }
            </Select>
          </FormControl>
      </div>
      <div className="app_stats">
      {/* InfoBoxes1 */}
      {/* InfoBoxes2 */}
      {/* InfoBoxes3 */}
      <Infobox isRed active={casesType==="cases"} onClick={(e)=>setcasesType("cases")} title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/> 
      <Infobox active={casesType==="recovered"} onClick={(e)=>setcasesType("recovered")} title="Recovery Cases" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>    
      <Infobox isRed active={casesType==="deaths"} onClick={(e)=>setcasesType("deaths")} title="Deaths Cases" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>    
      </div>
      {/* map */}
          <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div> 

      <Card className="app_right">
           {/* table */}
           {/* Graph */}
          <CardContent>
            <h3>Live Cases By Country</h3>
            <Table countries={countryTable}/>
            <h3 style={{marginTop:10}}>Worldwide New {casesType}</h3><br/>
            <LineGraph casesType={casesType}/>
          </CardContent>  
      </Card>

    </div>
  )
}
 
export default App
