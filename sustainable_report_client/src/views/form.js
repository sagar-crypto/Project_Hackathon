import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../SupplierForm.css';

function Form() {
  const [supplierName, setSupplierName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API URL
    const apiURL = 'https://jsonplaceholder.typicode.com/users/1';

    axios.get(apiURL)
      .then(response => {
        const data = response.data;
        setSupplierName(data.name);
        setEmail(data.email);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the supplier data!', error);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Supplier Name: ${supplierName}\nEmail: ${email}`);
  };

  return (
    <div className="supplier-form-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="supplierName">Supplier Name:</label>
            <input
              type="text"
              id="supplierName"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Form;
