import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import CarbonEmissions from 'views/reporting/CarbonEmission';
import TransportModesTable from 'views/reporting/transportModes';
import ProductCategoryPieChart from 'views/reporting/productCategoryPie';
import SupplierCompliancy from 'views/reporting/averageUnits';

function Report() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        Sustainability Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CarbonEmissions />
        </Grid>
        <Grid item xs={12} md={6}>
          <SupplierCompliancy />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransportModesTable />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductCategoryPieChart />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Report;    