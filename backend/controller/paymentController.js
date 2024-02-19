const { asyncErrorhandler } = require("../middleware/catchasyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = asyncErrorhandler(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const apiKey = authorizationHeader.split(" ")[1];
  const stripeInstance = require("stripe")(apiKey);

  try {
    const { amount } = req.body;

    // Instead of createToken, use createSource or createPaymentMethod
    // const source = await stripeInstance.paymentMethods.create({
    //   type: 'card',
    //   card: {
    //     number: '4242424242424242',
    //     exp_month: 12,
    //     exp_year: 2024,
    //     cvc: '123',
    //   }
    // });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
    });
    const confirmedIntent = await stripe.paymentIntents.confirm(paymentIntent);
    // return paymentIntent;

    res.status(200).json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    console.error("Error processing payment:", error.name);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


exports.sendStripeApiKey = asyncErrorhandler(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
