import React from "react";
import Razorpay from "razorpay";

class Pay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: "",
      paymentId: "",
      signature: "",
    };
    this.createOrder = this.createOrder.bind(this);
    this.verifyPayment = this.verifyPayment.bind(this);
  }

  componentDidMount() {
    this.rzp = new Razorpay({
      key: "rzp_test_XEpO7zQzzsnXb3",
      name: "Tune Hub",
      description: "Test Transaction",
      handler: this.handleRazorpayResponse.bind(this),
      prefill: {
        name: "Your Name",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    });
  }

  handleRazorpayResponse(response) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;
    this.setState({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });
    this.verifyPayment();
  }

  createOrder(e) {
    e.preventDefault();
    fetch("http://localhost:8080/createOrder", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        this.rzp.open({
          amount: data.amount_due,
          currency: "INR",
          order_id: data.id,
        });
      })
      .catch((error) => console.error("Error:", error));
  }

  verifyPayment() {
    const { orderId, paymentId, signature } = this.state;
    fetch("http://localhost:8080/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        paymentId: paymentId,
        signature: signature,
      }),
    })
      .then((response) => response.json())
      .then((isValid) => {
        if (isValid) {
          alert("Payment successful");
          window.location.href = "/payment-success";
        } else {
          alert("Payment failed");
          window.location.href = "/payment-failure";
        }
      })
      .catch((error) => console.error("Error verifying payment:", error));
  }

  render() {
    return (
      <div>
        <h1>Why premium ?</h1>
        <p>text...................</p>
        <form id="payment-form" onSubmit={this.createOrder}>
          <button type="submit" className="buy-button">
            BUY
          </button>
        </form>
      </div>
    );
  }
}

export default Pay;
