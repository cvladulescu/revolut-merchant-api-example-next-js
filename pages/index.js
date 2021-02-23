import fetch from "isomorphic-fetch";
import Router from "next/router";
import RevolutCheckout from "@revolut/checkout";
import { useState } from "react";
import { Button, Input, Spacer, Grid, ButtonGroup, Textarea } from '@geist-ui/react';



function GoodsPage({ goods, initialCart }) {
  const [cart, setCart] = useState(initialCart);

  const [value, setValue] = useState()
  const handler = (e) => {
    setValue(e.target.value)
    console.log(e.target.value)
  }

  async function handleCheckoutClick() {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart })
    });

    const order = await response.json();
    Router.push(`/checkout?order=${order.id}`);
  }

  async function Pay(){
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart })
    });

    const order = await response.json();
    Router.push(`/checkout?order=${order.id}`);

    
  }
  const add1 = (numar) =>  {
    console.log(numar);
  }
  const add2 = (e) =>  {
    console.log('5');
  }
  const add3 = (e) =>  {
    console.log('100');
  }



  return (
    <>

<Grid.Container gap={2} justify="left">
      <Grid xs={24}><h2>Catalogue</h2></Grid>
      <Grid xs={24}>
        <Input status="success" placeholder="Min 1" min="1" inputMode="numeric" pattern="" value={1} />
        <Button type="success" onClick={Pay}>Pay</Button>
      </Grid>
      <Grid xs={24}>
        <ButtonGroup type="success">
        <Button onClick={add1}>1</Button>
        <Button onClick={add2}>5</Button>
        <Button onClick={add3}>100</Button>
  </ButtonGroup>
      </Grid>
      <Grid xs={24}>
      <Textarea placeholder="Please enter your message." status="success" minHeight="65px" />
      </Grid>
    </Grid.Container>
      
  
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
