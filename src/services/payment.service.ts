export const simulatePayment = (amount: number) => {
    return {
      status: "success",
      transactionId: Math.random().toString(36).substr(2, 9),
      amount,
    };
  };
  