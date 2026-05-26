const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8086;

app.use(cors());
app.use(express.json());

// Lead creation API endpoint
app.post('/api/leads', async (req, res) => {
  const { name, email, phone, service_goal } = req.body;
  
  if (!name || !email || !service_goal) {
    return res.status(400).json({ error: 'Please provide all required fields: name, email, and service_goal.' });
  }

  try {
    const query = 'INSERT INTO leads (name, email, phone, service_goal) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, phone || null, service_goal];
    
    const result = await pool.query(query, values);
    console.log('Lead successfully inserted:', result.rows[0]);
    
    return res.status(201).json({
      success: true,
      message: 'Lead registered successfully!',
      lead: result.rows[0]
    });
  } catch (err) {
    console.error('Error inserting lead into PostgreSQL:', err.message);
    return res.status(500).json({ error: 'Database error. Failed to save lead details.' });
  }
});

// Custom Hire/Setup creation API endpoint
app.post('/api/hires', async (req, res) => {
  const { name, email, phone, project_type, details, budget } = req.body;

  if (!name || !email || !project_type) {
    return res.status(400).json({ error: 'Please provide all required fields: name, email, and project_type.' });
  }

  // Parse budget as decimal, default to $50.00
  const parsedBudget = parseFloat(budget) || 50.00;

  try {
    const query = 'INSERT INTO hires (client_name, client_email, client_phone, project_type, details, budget) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [name, email, phone || null, project_type, details || null, parsedBudget];

    const result = await pool.query(query, values);
    console.log('Setup Hire details successfully logged:', result.rows[0]);

    return res.status(201).json({
      success: true,
      message: 'Hiring inquiry registered successfully!',
      hire: result.rows[0]
    });
  } catch (err) {
    console.error('Error inserting hire details into PostgreSQL:', err.message);
    return res.status(500).json({ error: 'Database error. Failed to save project details.' });
  }
});

// Voluntary Donation/Support pledges API endpoint
app.post('/api/donations', async (req, res) => {
  const { donor_name, donor_email, amount, currency, product_id } = req.body;

  if (!amount || isNaN(amount) || parseFloat(amount) < 1.0) {
    return res.status(400).json({ error: 'Please provide a valid support amount of at least $1.00.' });
  }

  const parsedAmount = parseFloat(amount);
  const name = donor_name || 'Anonymous';

  try {
    const query = 'INSERT INTO donations (donor_name, donor_email, amount, currency, product_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, donor_email || null, parsedAmount, currency || 'USD', product_id || null];

    const result = await pool.query(query, values);
    console.log('Voluntary donation details successfully logged:', result.rows[0]);

    return res.status(201).json({
      success: true,
      message: 'Thank you for your generous support!',
      donation: result.rows[0]
    });
  } catch (err) {
    console.error('Error inserting donation details into PostgreSQL:', err.message);
    return res.status(500).json({ error: 'Database error. Failed to log donation details.' });
  }
});

// GET health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`StackOrbitAI Node.js Express API server running on 0.0.0.0:${PORT}`);
});
