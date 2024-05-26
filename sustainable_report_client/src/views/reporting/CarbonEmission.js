import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const CarbonEmissions = () => {
  const [emissions, setEmissions] = useState(null);

  useEffect(() => {
    // axios.get('/api/carbon-emissions').then(response => {
    //   setEmissions(response.data.total);
    // });
    setEmissions(550)
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          Carbon Emissions (Quarter)
        </Typography>
        <Typography variant="h4" component="div" sx={{ color: 'green' }}>
            {emissions} Metric Tons
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CarbonEmissions;