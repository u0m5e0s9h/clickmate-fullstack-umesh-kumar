
import React, { useState } from 'react';
import Chat from '../components/Chat';

const Home: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [hasJoined, setHasJoined] = useState(false);

  const placeOrder = async () => {
    const orderPayload = {
      productId: Math.floor(Math.random() * 1000),
      buyer: username,
      quantity: 1,
    };

    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        setOrderStatus('Order placed successfully!');
      } else {
        setOrderStatus('Failed to place order.');
      }
    } catch (error) {
      setOrderStatus('Error placing order.');
    }

    setTimeout(() => {
      setOrderStatus(null);
    }, 3000);
  };

  if (!hasJoined) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Enter your name to join</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          className="px-4 py-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={() => username.trim() && setHasJoined(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Join Room
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Live Shopping Room</h1>
      <div className="w-full max-w-2xl flex flex-col space-y-4">
        <Chat username={username} />
        <button
          onClick={placeOrder}
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
        {orderStatus && (
          <div className="mt-2 text-center text-green-700 font-semibold">
            {orderStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

