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
  const sum = ({Component, pageProps}) => {
    const [clickAmount, setClickAmount] = useState(0);
    const increment = () => setClickAmount((amount) => amount + 1);
  }
console.log(cart);



  const setAmount = (e) => {
    setValue(e.target.value)
    goods.map(item=>{
      item = {
      amount:e.target.value,
      id:item.id,
      title:"Donation",
      currency:"GBP"
      },
      // item.amount=e.target.value,
      // this.setState(item),
      setCart([...cart,item.id]),
      console.log(item)
    })
  }



  return (
    <>

<Grid.Container gap={2} justify="left">
      <Grid xs={24}>
          <h3>Catalogue</h3> 
       </Grid>
      {/* <Grid xs={24}>
        <Input status="success" onChange={setAmount} placeholder="Min 1" min="1" inputMode="numeric" pattern="" value={value} />
        
      </Grid> */}
      <Grid xs={24}>
        
        {goods.map(item => (           

          cart.includes(item.id) ? ( 
            <ButtonGroup auto type="error-light">
            <Button onClick={() => {
              setCart(cart.filter(id => id !== item.id));
            }}>
              {(item.amount / 100).toLocaleString("en", {
              style: "currency",
              currency: item.currency
            })}
            </Button>
            </ButtonGroup>
            
          ) : (
            <ButtonGroup auto type="success-light">
            <Button onClick={() => {
              setCart([...cart, item.id]);
            }}>
              {(item.amount / 100).toLocaleString("en", {
              style: "currency",
              currency: item.currency
            })}
            </Button>
            </ButtonGroup>
          )

        ))}
  
      </Grid>
      <Grid xs={24}>
      <Textarea placeholder="Please enter your message." status="success" minHeight="65px" />
      </Grid>
      <Button type="success" onClick={Pay}>Pay</Button>
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
