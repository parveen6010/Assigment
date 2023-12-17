// src/TicketForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from '@chakra-ui/react';

const TicketForm = () => {
  const [formValues, setFormValues] = useState({
    experienceName: '',
    date: '',
    numberOfPersons: '',
    customerName: '',
  });

  const [ticketImage, setTicketImage] = useState(null);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Validate input based on the field
    if (name === 'experienceName' || name === 'customerName') {
      // Allow only alphabets and spaces
      updatedValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'numberOfPersons') {
      // Allow only numbers
      updatedValue = value.replace(/[^0-9]/g, '');
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); 
      const response = await axios.post(
        'http://localhost:5000/generate-ticket',
        formValues,
        {
          responseType: 'json', // Expecting JSON response
        }
      );

      const { imageUrl } = response.data; // Assuming the server returns an imageUrl

      setTicketImage(imageUrl);
      setTicketGenerated(true);

      try {
        const imageUr = `${window.location.origin}${imageUrl}`;
        const imageResponse = await fetch(imageUr);

        if (imageResponse.ok) {
          const blob = await imageResponse.blob();
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'ticket.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error('Error downloading image:', imageResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching image:', error.message);
      }
    } catch (error) {
      console.error('Error generating ticket:', error);
      console.error('Error details:', error.response);
    } finally {
      // Disable loading state after 5 seconds
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10"
      p="4"
      borderRadius="md"
      bgColor="lightblue"
    >
      {ticketGenerated ? (
        <Box>
          <Heading mb="4" textAlign="center">
            Your Ticket Generated
          </Heading>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Heading mb="4" textAlign="center">
            Ticket Form
          </Heading>
          <FormControl mb="4">
            <FormLabel>Experience Name:</FormLabel>
            <Input
              type="text"
              name="experienceName"
              value={formValues.experienceName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Date:</FormLabel>
            <Input
              type="date"
              name="date"
              value={formValues.date}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Number of Persons:</FormLabel>
            <Input
              type="text"
              name="numberOfPersons"
              value={formValues.numberOfPersons}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Customer Name:</FormLabel>
            <Input
              type="text"
              name="customerName"
              value={formValues.customerName}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            mt="4"
            colorScheme="teal"
            type="submit"
            width="100%"
            isLoading={loading}
            loadingText="Generating Ticket..."
          >
            Generate Ticket
          </Button>
        </form>
      )}
    </Box>
  );
};

export default TicketForm;
