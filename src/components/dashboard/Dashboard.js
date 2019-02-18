import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  //// Declare a new state variable
  const [priceData, setpriceData] = useState([]);

  const fetchPrice = async function() {
    return await axios.get(`https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json`)
                  .then(response => setpriceData(response.data.values.splice(0, 10)))
                  .catch((error) => console.log(`Danger Front End ${ error }`));
  };

  //// Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchPrice();
  }, []);

  let displayPlot = priceData.map((value, index) => {
    console.log(value, index)
    return(
      <div>
        <ul>
          <li>x: { value.x }</li>
          <li>y: { value.y }</li>
        </ul>
      </div>
    )
  });

  return(
    <div>
      <p>Dashboard components</p>
      { displayPlot }
    </div>
  )
}

export default Dashboard;
