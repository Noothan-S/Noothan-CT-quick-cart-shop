import { Request, Response } from "express";
import Stripe from "stripe";
import config from "../../config";

export async function stripe(req: Request, res: Response) {
  const stripe = new Stripe(config.stripe_secret_key as string);

  if (!req.body.amount) {
    res.status(400).json({
      status: 400,
      success: false,
      message: "Amount not provided",
      data: null,
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(req.body.amount),
      currency: "usd",
    });

    res.status(201).json({
      status: 201,
      success: false,
      message: "Stripe payment intent created successfully",
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong",
      data: null,
    });

    console.log(error);
  }
}
