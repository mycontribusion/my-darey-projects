// src/components/ItemFetcher.jsx
import React, { useState, useEffect } from "react";
import ListComponent from "../ListComponent";

const ItemFetcher = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then((data) => setItems(data.slice(0, 10))) // limit to 10 items
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (items.length === 0) return <div>No items found.</div>;

  return <ListComponent items={items} renderItem={(item) => <li key={item.id}>{item.title}</li>} />;
};

export default ItemFetcher;
