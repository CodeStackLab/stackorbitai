const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres_pass@db:5432/stackorbitai_db'
});

// Test connection and auto-initialize schema
const initDB = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('PostgreSQL Connected successfully:', res.rows[0].now);
    
    // Create leads table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        service_goal VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure phone column exists (auto-migration for existing tables)
    await pool.query(`
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone VARCHAR(50)
    `);

    // Create hires table for custom setup inquiries ($50 starting budget)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hires (
        id SERIAL PRIMARY KEY,
        client_name VARCHAR(100) NOT NULL,
        client_email VARCHAR(255) NOT NULL,
        client_phone VARCHAR(50),
        project_type VARCHAR(100) NOT NULL,
        details TEXT,
        budget NUMERIC(10, 2) DEFAULT 50.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create donations table for micro-support voluntary contributions ($1, $5, $50, $100, custom)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        donor_name VARCHAR(100) DEFAULT 'Anonymous',
        donor_email VARCHAR(255),
        amount NUMERIC(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'USD',
        product_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('PostgreSQL "leads", "hires", and "donations" tables verified/created successfully.');
  } catch (err) {
    console.error('PostgreSQL Connection/Initialization error:', err.message);
  }
};

initDB();

module.exports = pool;
