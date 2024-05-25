import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const SupplierCompliancy = () => {
  const [compliantSupplier, setCompliantSupplier] = useState(null);
  const [totalSupplier, setTotalSupplier] = useState(null);

  useEffect(() => {
    setCompliantSupplier(7)
    setTotalSupplier(10)
    // axios.get('/api/average-units').then(response => {
    //   setAverageUnits(response.data.average);

    // });
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          Total Units
        </Typography>
        <Typography variant="h4" component="div" sx={{ color: 'green' }}>
            Total {compliantSupplier} EUDR compliant supplier out of {totalSupplier} Total Suppliers
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SupplierCompliancy;