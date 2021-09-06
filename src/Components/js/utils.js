import React from "react";
import numeral from "numeral";
import { Circle,Popup } from "react-leaflet";

const casesTypeColors = {
    cases:{
        hex:" #CC1034",
        muiltiplier:250
    },
    recovered:{
        hex:"#7dd71d",
        muiltiplier:250
    },
    deaths:{
        hex:"#fb4443",
        muiltiplier:1450
    },
}

export const sortData = (data)=>{
    const sortedData = [...data];
    return sortedData.sort((a,b)=>a.cases>b.cases?-1:1);
}; 

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data,casesType="cases")=>(
    data.map(country=>(
        
         <Circle
         center={[country.countryInfo.lat, country.countryInfo.long]}
         fillOpacity={0.4}
         pathOptions={{fillColor:casesTypeColors[casesType].hex,
         color:casesTypeColors[casesType].hex}}
         radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].muiltiplier}
         >
            <Popup>
                <div className="info-container">
                    <div className="info-flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}/>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0a")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0a")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0a")}</div>
                </div>
            </Popup>
         </Circle>   
    ))
)