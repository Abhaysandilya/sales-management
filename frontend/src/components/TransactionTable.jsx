import '../styles/TransactionTable.css';

function TransactionTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="transaction-table empty">
        <p>No sales data found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="transaction-table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Region</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Price/Unit</th>
            <th>Discount</th>
            <th>Total Amount</th>
            <th>Final Amount</th>
            <th>Payment Method</th>
            <th>Order Status</th>
            <th>Delivery Type</th>
            <th>Store Location</th>
            <th>Employee Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{formatDate(row['Date'])}</td>
              <td>{row['Customer Name'] || '-'}</td>
              <td>{row['Phone Number'] || '-'}</td>
              <td>{row['Customer Region'] || '-'}</td>
              <td>{row['Gender'] || '-'}</td>
              <td>{row['Age'] || '-'}</td>
              <td>{row['Product Name'] || '-'}</td>
              <td>{row['Product Category'] || '-'}</td>
              <td>{row['Brand'] || '-'}</td>
              <td>{row['Quantity'] || '-'}</td>
              <td>{row['Price per Unit'] ? formatCurrency(parseFloat(row['Price per Unit'])) : '-'}</td>
              <td>{row['Discount Percentage'] ? `${row['Discount Percentage']}%` : '-'}</td>
              <td>{row['Total Amount'] ? formatCurrency(parseFloat(row['Total Amount'])) : '-'}</td>
              <td>{row['Final Amount'] ? formatCurrency(parseFloat(row['Final Amount'])) : '-'}</td>
              <td>{row['Payment Method'] || '-'}</td>
              <td>{row['Order Status'] || '-'}</td>
              <td>{row['Delivery Type'] || '-'}</td>
              <td>{row['Store Location'] || '-'}</td>
              <td>{row['Employee Name'] || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;

