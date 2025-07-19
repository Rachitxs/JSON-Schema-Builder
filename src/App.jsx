import React, { useState } from "react";
import SchemaBuilder from "./components/schemaBuilder";

function App() {
  const [jsonOutput, setJsonOutput] = useState({});

  const generateSampleJson = (fields) => {
    const result = {};

    if (!Array.isArray(fields)) return result;

    fields.forEach((field) => {
      if (!field.name) return;

      if (field.type === "nested") {
        result[field.name] = generateSampleJson(field.children || []);
      } else if (field.type === "array") {
        result[field.name] = ["string"];
      } else {
        result[field.name] = getSampleValue(field.type);
      }
    });

    return result;
  };

  const getSampleValue = (type) => {
    switch (type) {
      case "string":
        return "string";
      case "number":
        return "number";
      case "float":
        return "decimal number";
      case "boolean":
        return "bool";
      case "objectid":
        return "object id";
      default:
        return null;
    }
  };
  const handleSubmit = (fields) => {
    const finalJson = generateSampleJson(fields);
    console.log("Submitted JSON:", finalJson);

    // alert de skte h submit p
    // alert("Schema submitted!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>JSON Schema Builder</h2>

      <SchemaBuilder
        //iss me changes krna h akhri me yaad se**
        onSchemaChange={(fields) => {
          const json = generateSampleJson(fields);
          //output k liye
          setJsonOutput(json);
        }}
      />

      <pre
        style={{
          marginTop: 30,
          background: "#f5f5f5",
          padding: 20,
          borderRadius: 8,
        }}
      >
        {JSON.stringify(jsonOutput, null, 2)}
      </pre>
      <div style={{ marginTop: 30 }}>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
