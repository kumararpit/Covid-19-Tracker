import React, { useState,useEffect } from 'react';
import { Card,CardContent} from '@material-ui/core';
import Casetile from './Cases_tiles'
import Map from './Map';
import Table from './Table'
import {sortData, formatstat} from './untile.js';
import Livegraph from './Livegraph'
import "./App.css";
import { Select ,MenuItem,FormControl} from '@material-ui/core';
function App() {
    const [countries,setcountries]=useState([]);
    const [country,setcountry]=useState('worldwide');
    const [countryInfo,setcountryInfo]=useState({});
    const [tabledata,settabledata]=useState([]);
    const[mapcenter,setmapcenter]=useState({lat:34.80746, lng:-40.4796});
    const [mapzoom,setmapzoom]=useState(2);
    const[mapcountry,setmapcountry]=useState([])
    const[casesType,setcasesType]=useState("cases");
    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/all')
        .then((response)=>response.json())
        .then((data)=>{
          setcountryInfo(data)
        })
    },[])
    useEffect(() => {
       const getcontriesdata=async()=>{
        await fetch('https://disease.sh/v3/covid-19/countries')
         .then((response)=>response.json())
         .then((data)=>{
             const countries= data.map((country)=>({
                 name:country.country,
                 value: country.countryInfo.iso2
             }));
             const sorteddata=sortData(data);
             setmapcountry(data);
             settabledata(sorteddata);
             setcountries(countries);
         })
       }
       getcontriesdata();
    }, []);
    const selectcountry=async(event)=>{
      const getcountrycode=event.target.value;
      setcountry(getcountrycode);
      const url=getcountrycode==="worldwide" ? 'https://disease.sh/v3/covid-19/all' 
      :`https://disease.sh/v3/covid-19/countries/${getcountrycode}?strict=true`;
      await fetch(url)
      .then((response)=>response.json())
      .then((data)=>{
              setcountry(getcountrycode);
              setcountryInfo(data);
              setmapcenter([data.countryInfo.lat, data.countryInfo.long]);
              console.log(mapcenter)
              setmapzoom(3)
      })
    }
  return (
    <div className='app'>
      <div className="left_part">
    <div className="heading_top">
     <h3>Covid-19 Tracker</h3>
     <FormControl>
     <Select variant="outlined" value={country}  onChange={(e)=>selectcountry(e)}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
         {
               countries.map((country)=>(
              <MenuItem value={country.value} key={country.value}>{country.name}</MenuItem>
            ))
         } 
        </Select>
        </FormControl>
    </div>
    <div className="case_tiles">
       <Casetile className="info_tiles" 
      onClick={(e)=>setcasesType("cases")}
       title="Coronavirus cases" 
       cases={formatstat(countryInfo.todayCases)} 
       Total={`${formatstat(countryInfo.cases)} Total`}
        />
       <Casetile className="info_tiles"
        onClick={(e)=>setcasesType("recovered")}
        title="Recovery" 
        cases={formatstat(countryInfo.todayRecovered)} 
        Total={`${formatstat(countryInfo.recovered)} Total`}
        />
       <Casetile className="info_tiles" 
        onClick={(e)=>setcasesType("deaths")}
       title="Deaths" 
       cases={formatstat(countryInfo.todayDeaths)} 
       Total={`${formatstat(countryInfo.deaths)} Total`}  
        /> 
    </div>
      <Map caseType={casesType} 
      center={mapcenter} 
      zoom={mapzoom} 
      countries={mapcountry} 
      />
      </div>
      <Card className="right_part">
         <CardContent>
           <h4> Live cases by countries</h4>
          <Table countries={tabledata} />
          <h4>Worldwide new {casesType}</h4>
          <Livegraph casesType={casesType}/>
         </CardContent>
      </Card>
    </div>
  );
}

export default App;
