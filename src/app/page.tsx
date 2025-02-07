"use client";
import { ENVIRONMENT, PADDLE_API_KEY } from "@/constant";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: ENVIRONMENT === "production" ? "production" : "sandbox",
      token: PADDLE_API_KEY,
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [{ priceId: "pri_01jkf7kfyj4h52gwb563wnv6h0" }],
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={openCheckout}>Open Checkout</Button>
    </main>
  );
}
