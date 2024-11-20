import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Typography, Box, TextField, CircularProgress } from '@mui/material';

function CheckoutForm({ onTokenGenerated }) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('eur');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    if (!stripe || !elements) {
      setError('Stripe has not loaded properly.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Please enter card details.');
      return;
    }

    if (!name || !amount || isNaN(amount)) {
      setError('Please fill in all fields correctly.');
      return;
    }

    setLoading(true); // Set loading state

    try {
      const { error, token } = await stripe.createToken(cardElement, { name });

      if (error) {
        setError(error.message);
      } else {
        setError('');
        console.log('Generated Token:', token);
        
        // Save the token to local storage
        localStorage.setItem("stripeToken", token.id);

        const paymentData = {
          name,
          amount: parseInt(amount),
          currency,
          token: token.id,
        };

        console.log('Data to be sent to backend:', paymentData);
        onTokenGenerated(paymentData); // Pass data back to parent component
      }
    } catch (error) {
      setError('Error generating token. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={4}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <Typography variant="h5" mb={3}>
          Complete Your Payment
        </Typography>

        <TextField
          label="Name On Card"
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Amount"
          variant="outlined"
          fullWidth
          required
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Currency"
          variant="outlined"
          fullWidth
          required
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          margin="normal"
        />

        <Box my={2} p={2} border="1px solid #ccc" borderRadius={2}>
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146' },
              },
            }}
          />
        </Box>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!stripe || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Pay"}
        </Button>
      </form>
    </Box>
  );
}

export default CheckoutForm;
