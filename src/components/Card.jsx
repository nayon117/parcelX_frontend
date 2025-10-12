// src/components/ui/card.jsx
import React from "react";

export const Card = ({ children }) => (
  <div className="border rounded-lg shadow-sm bg-white">{children}</div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`border-b p-3 flex items-center ${className}`}>{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

export const CardContent = ({ children }) => (
  <div className="p-3">{children}</div>
);
