// src/components/ListComponent.jsx
import React from "react";

const ListComponent = ({ items, renderItem }) => {
  return <ul>{items.map(renderItem)}</ul>;
};

export default ListComponent;
