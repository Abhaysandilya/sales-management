/**
 * Utility script to convert CSV sales data to JSON format
 * Usage: node utils/csv-to-json.js <input.csv> [output.json]
 * If output.json is not provided, defaults to backend/data/sales_data.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function csvToJson(csvPath, jsonPath) {
  try {
    console.log(`Reading CSV file: ${csvPath}`);
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    
    // Handle different line endings (Windows \r\n, Unix \n, Mac \r)
    const lines = csvContent.split(/\r?\n|\r/).filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
      console.error('CSV file is empty');
      return;
    }

    console.log(`Found ${lines.length} lines in CSV file`);

    // Parse header - handle quoted headers and trim whitespace
    const headerLine = lines[0];
    const headers = parseCSVLine(headerLine).map(h => h.trim().replace(/^"|"$/g, ''));
    console.log(`Found ${headers.length} columns: ${headers.slice(0, 5).join(', ')}...`);
    
    // Parse data rows
    const data = [];
    let skippedRows = 0;
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      
      // Skip empty rows
      if (values.every(v => !v || v.trim() === '')) {
        skippedRows++;
        continue;
      }
      
      // Handle rows with different column counts (pad or truncate)
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = (values[index] || '').trim();
      });
      
      // Add any extra values as empty strings
      if (values.length > headers.length) {
        console.warn(`Row ${i + 1} has ${values.length} columns, expected ${headers.length}. Extra columns ignored.`);
      }
      
      data.push(obj);
    }

    // Ensure output directory exists
    const outputDir = path.dirname(jsonPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON file (compact format for large datasets)
    const jsonContent = JSON.stringify(data, null, 0);
    fs.writeFileSync(jsonPath, jsonContent, 'utf-8');
    
    console.log(`\n✅ Successfully converted ${data.length} records from CSV to JSON`);
    console.log(`📁 Output saved to: ${jsonPath}`);
    console.log(`📊 File size: ${(jsonContent.length / 1024 / 1024).toFixed(2)} MB`);
    if (skippedRows > 0) {
      console.log(`⚠️  Skipped ${skippedRows} empty rows`);
    }
  } catch (error) {
    console.error('❌ Error converting CSV to JSON:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      // Handle escaped quotes ("")
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last value
  values.push(current.trim());
  return values;
}

// Run if called directly
const args = process.argv.slice(2);
if (args.length >= 1) {
  const csvPath = path.resolve(args[0]);
  
  // Check if CSV file exists
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ Error: CSV file not found: ${csvPath}`);
    process.exit(1);
  }
  
  // Determine output path
  let jsonPath;
  if (args.length >= 2) {
    jsonPath = path.resolve(args[1]);
  } else {
    // Default to backend/data/sales_data.json
    const backendDataDir = path.join(__dirname, '../data');
    jsonPath = path.join(backendDataDir, 'sales_data.json');
  }
  
  csvToJson(csvPath, jsonPath);
} else {
  console.log('Usage: node utils/csv-to-json.js <input.csv> [output.json]');
  console.log('\nExamples:');
  console.log('  node utils/csv-to-json.js truestate_assignment_dataset.csv');
  console.log('  node utils/csv-to-json.js ../truestate_assignment_dataset.csv backend/data/sales_data.json');
  console.log('\nIf output.json is not provided, defaults to backend/data/sales_data.json');
}

