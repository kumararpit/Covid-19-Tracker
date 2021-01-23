import React from 'react'
import numeral from 'numeral'
import {Circle,Popup} from 'react-leaflet'
const caseTypecolor={
    cases:{
        hex:"#cc1034",
        multiplier:500,
    },
    recovered:{
        hex:"#7dd71d",
        multiplier:900,
    },
    deaths:{
        hex:"#fb4443",
        multiplier:1700,
    }
}
export const sortData=(data)=>{
     const sorteddata=[...data];
     sorteddata.sort((a,b)=>{
         if(a.cases>b.cases){
             return -1;
         }
         else{
             return +1;
         }
     })
     return sorteddata;
}
export const showmapdata=(data,caseType)=>(
    data.map(country=>(
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        weight={1}
        color={caseTypecolor[caseType].hex}
        fillColor={caseTypecolor[caseType].hex}
        radius={
            Math.sqrt(country[caseType])*caseTypecolor[caseType].multiplier
        }
        >
       <Popup>
           <div>
               <div
               style={{backgroundImage:`url(${country.countryInfo.flag})`}}
               />
               <div><strong>{country.country}</strong></div>
               <div>Cases: {numeral(country.cases).format("0,0")}</div>
               <div>recovered: {numeral(country.recovered).format("0,0")}</div>
               <div>deaths: {numeral(country.deaths).format("0,0")}</div>
           </div>
       </Popup>
        </Circle>
    ))
)
export const formatstat=(stat)=>
    stat? `+${numeral(stat).format("0.0a")}`:"+0"
