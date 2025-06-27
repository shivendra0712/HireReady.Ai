const paymentConfirmationTemplate = (username, amount) => {
  return `
    <h2>Hello, ${username}</h2>
      <p>Your payment has been successfully processed!</p>
      <h3>Payment Details:</h3>
      <ul>
          <li><strong>Amount:</strong> ₹${amount}</li>
      </ul>
      <p>Thank you for choosing us!</p>
      <p>We look forward to hosting you soon.</p>
    `;
};

module.exports = {paymentConfirmationTemplate};

