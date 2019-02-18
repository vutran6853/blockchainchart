import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const moment = require('moment');

function Dashboard() {
  //// Declare a new state variable
  const [transactionData, setTransactionData] = useState([]);
  const [transactionDescriptionData, setTransactionDescriptionData] = useState('')

  const fetchPrice = async function() {
    return await axios.get(`https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json`)
                  .then((response) => {
                    // console.log(response.data);
                    setTransactionData(response.data.values.splice(0, 100))
                    setTransactionDescriptionData(response.data.description)
                  })
                  .catch((error) => console.log(`Danger Front End ${ error }`));
  };

  //// Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchPrice();
  }, []);


  let display_x_plot = transactionData.map((value, index) => {
    // console.log(moment.unix(value.x).format('MMM DD YYYY T hh:mm '))
    return moment.unix(value.x).format('MMM DD YYYY T hh:mm ')
  });

  let display_y_plot = transactionData.map((value, index) => {
    // console.log(value.y)
    return value.y
  });

  let data = {
    labels: display_x_plot,
    datasets: [
      {
        label: transactionDescriptionData,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: display_y_plot
      }
    ]
  };

  return(
    <div>
      <p>Dashboard components</p>

        <Line data={ data }
              width={ 100 } 
              height={ 20 }
              // options={ { maintainAspectRatio: false } }
        />
    </div>
  )
}

export default Dashboard;
