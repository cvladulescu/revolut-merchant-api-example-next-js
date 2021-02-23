import fetch from "isomorphic-fetch";
import Router from "next/router";
import RevolutCheckout from "@revolut/checkout";
import { useState } from "react";
import { Button } from '@geist-ui/react';

function GoodsPage({ goods, initialCart }) {
  const [cart, setCart] = useState(initialCart);

  async function handleCheckoutClick() {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart })
    });

    const order = await response.json();
    Router.push(`/checkout?order=${order.id}`);
  }

  return (
    <>
      <h2>Catalogue</h2>
      <ul>
        {goods.map(item => (
          <li key={item.id}>
            <h3>
              {item.title}
              {" · "}
              {(item.amount / 100).toLocaleString("en", {
                style: "currency",
                currency: item.currency
              })}
            </h3>
            {cart.includes(item.id) ? (
              <Button
                onClick={() => {
                  setCart(cart.filter(id => id !== item.id));
                }}
              >
                Remove from cart
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setCart([...cart, item.id]);
                }}
              >
                Add to cart
              </Button>
            )}
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <>
          <hr />
          <Button onClick={handleCheckoutClick}>Checkout</Button>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ query, req }) {
  const baseUrl = `http://${req.headers.host}`;

  const response = await fetch(`${baseUrl}/api/goods`);
  const goods = response.ok ? await response.json() : [];

  if (query.order) {
    const response = await fetch(`${baseUrl}/api/orders/${query.order}`);

    if (response.ok) {
      const order = await response.json();

      return {
        props: {
          goods,
          initialCart: order.cart.map(item => item._id)
        }
      };
    }
  }

  return {
    props: {
      goods,
      initialCart: []
    }
  };
}


export default GoodsPage;
