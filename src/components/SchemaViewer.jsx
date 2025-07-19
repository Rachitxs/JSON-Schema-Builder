import React from "react";

export default function SchemaViewer({ schema }) {
  return (
    <pre
      style={{
        backgroundColor: "#f6f6f6",
        padding: "16px",
        borderRadius: "8px",
        marginTop: "20px",
        overflowX: "auto",
      }}
    >
      {JSON.stringify(schema, null, 2)}
    </pre>
  );
}
