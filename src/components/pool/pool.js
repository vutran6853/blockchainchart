import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

function Pool() {
  //// Declare a new state variable
  const [poolData, setPoolData] = useState([]);

  //// Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchPrice();
  }, []);

  const fetchPrice = async function() {
    return await axios.get('https://api.blockchain.info/pools?timespan=5days')
                  .then((response) => {
                    // console.log(response.data)
                    setPoolData(response.data)
                  })
                  .catch((error) => console.log(`Danger Front End ${ error }`));
  };

  const displayPoolName = function() {
    let poolName = []

    for(let key in poolData) {
      // console.log(key)
      poolName.push(key)
    }

    return poolName
  };

  const displayPoolValue = function() {
    let poolValue = []

    for(let key in poolData) {
      // console.log(poolData)
      poolValue.push(poolData[key])
    }

    return poolValue
  }

  const data = {
    labels: displayPoolName(),
    datasets: [
      {
        data: displayPoolValue(),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#36A2EB', '#FFCE56', '#36A2EB', '#FFCE56', '#36A2EB', '#FFCE56', '#36A2EB', '#FFCE56', '#36A2EB', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56', '#36A2EB', '#FFCE56', '#36A2EB', '#FFCE56', '#36A2EB', '#FFCE56', '#36A2EB', '#FFCE56', '#36A2EB', '#FFCE56', '#36A2EB']
      }
    ]
  };

  return(
    <div>
      <p>Pool components</p>

      <Pie data={ data } />

    </div>
  )
}

export default Pool;