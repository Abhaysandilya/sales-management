import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let salesDataCache = null;

/**
 * Read and parse sales data from JSON file
 * @returns {Promise<Array>} Sales data array
 */
export async function readSalesData() {
  if (salesDataCache) {
    return salesDataCache;
  }

  try {
    // Try to read from data directory
    const dataPath = path.join(__dirname, '../../data/sales_data.json');
    
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      salesDataCache = JSON.parse(fileContent);
      return salesDataCache;
    } else {
      // If file doesn't exist, return empty array
      // User will need to add the data file
      console.warn('Sales data file not found. Please add sales_data.json to backend/data/');
      return [];
    }
  } catch (error) {
    console.error('Error reading sales data:', error);
    return [];
  }
}

/**
 * Clear the data cache (useful for development)
 */
export function clearDataCache() {
  salesDataCache = null;
}

