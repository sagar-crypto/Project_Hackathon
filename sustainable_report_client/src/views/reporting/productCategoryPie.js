import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

import axios from 'axios';

const ProductCategoryPieChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Product Categories',
        data: [],
        backgroundColor: ['red', 'blue', 'green'],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    // axios.get('/api/product-categories').then(response => {
    //   const categories = response.data.categories;
    //   const categories = {"timber": 1000, "cocoa": 500, "coal":5000}
    //   setData({
    //     labels: categories.map(c => c.name),
    //     datasets: [
    //       {
    //         label: 'Product Categories',
    //         data: categories.map(c => c.value),
    //         backgroundColor: ['red', 'blue', 'green'],
    //         hoverOffset: 4,
    //       },
    //     ],
    //   });
    // });
    const categories = [ {name: "timber", value: 1000} , {name: "coal", value: 200}, {name: "cocoa", value: 30000} ]
    setData({
        labels: categories.map(c => c.name),
        datasets: [
          {
            label: 'Product Categories',
            data: categories.map(c => c.value),
            backgroundColor: ['red', 'blue', 'green'],
            hoverOffset: 4,
          },
        ],
      });
      
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          Per Product Carbon Emission
        </Typography>
        <Pie data={data} />
      </CardContent>
    </Card>
  );
};

export default ProductCategoryPieChart;