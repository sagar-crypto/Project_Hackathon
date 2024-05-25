import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const TransportModesTable = () => {
    const [transportModes, setTransportModes] = useState([]);
  
    useEffect(() => {
    //   axios.get('/api/transport-modes').then(response => {
    //     setTransportModes(response.data.modes);
    //   });
    setTransportModes([
            { supplier: "ABC Global", mode: "Ship" },
            { supplier: "XYZ Logistics", mode: "Airplane" },
            { supplier: "FastTrack Supply", mode: "Truck" },
            { supplier: "Oceanic Transport", mode: "Ship" },
            { supplier: "SkyHigh Cargo", mode: "Airplane" },
            { supplier: "RoadRunner Haulage", mode: "Truck" },
            { supplier: "Maritime Movers", mode: "Ship" },
            { supplier: "AeroSwift", mode: "Airplane" },
            { supplier: "Highway Express", mode: "Truck" },
            { supplier: "Seaway Shipping", mode: "Ship" }
])

    }, []);
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            Transport Modes by Suppliers
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Supplier</TableCell>
                <TableCell>Transport Mode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transportModes.map((mode, index) => (
                <TableRow key={index}>
                  <TableCell>{mode.supplier}</TableCell>
                  <TableCell>{mode.mode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };
  
  export default TransportModesTable;