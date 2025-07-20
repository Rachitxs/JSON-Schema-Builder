import React, { useState, useEffect } from "react";
import { Input, Select, Button, Form, Switch, Collapse } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Panel } = Collapse;

const fieldTypes = [
  "string",
  "number",
  "float",
  "boolean",
  "objectid",
  "array",
  "nested",
];

function SchemaBuilder({ onSchemaChange }) {
  const [fields, setFields] = useState([]);
//initially required field ko false krdia h
  const addField = () => {
    setFields([
      ...fields,
      {
        name: "",
        type: "string",
        required: false,
        children: [],
      },
    ]);
  };

  const getSampleValue = (type) => {
    switch (type) {
      case "string":
        return "string";
      case "number":
        return 123;
      case "float":
        return 123.45;
      case "boolean":
        return true;
      case "objectid":
        return "507f1f77bcf86cd799439011";
      default:
        return null;
    }
  };

  const generateSampleJson = (fields2) => {
    //
    const result = {};

    //invalid output wale case ko handle krna h
    if (!Array.isArray(fields2)) return result;

    fields2.forEach((field) => {
      if (!field.name) return;

      if (field.type === "nested") {
        result[field.name] = generateSampleJson(field.children || []);
      } else if (field.type === "array") {
        result[field.name] = [getSampleValue("string")];
      } else {
        result[field.name] = getSampleValue(field.type);
      }
    });

    return result;
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;

    if (key === "type" && value !== "nested") {
      updated[index].children = [];
    }

    setFields(updated);
  };

  const updateNestedFields = (index, children) => {
    const updated = [...fields];
    updated[index].children = children;
    setFields(updated);
  };

  const removeField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  useEffect(() => {
    if (onSchemaChange) {
      onSchemaChange(fields);
    }
  }, [fields]);

  return (
    <>
      {fields.map((field, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: 16,
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <Form layout="inline">
            <Form.Item>
              <Input
                placeholder="Field name"
                value={field.name}
                onChange={(e) => updateField(idx, "name", e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Select
                value={field.type}
                onChange={(val) => updateField(idx, "type", val)}
                style={{ width: 130 }}
              >
                {fieldTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Switch
                checked={field.required}
                onChange={(val) => updateField(idx, "required", val)}
                checkedChildren="Required"
                unCheckedChildren="Optional"
              />
            </Form.Item>
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => removeField(idx)}
            />
          </Form>

          {field.type === "nested" && (
            <Collapse
              ghost
              style={{ marginTop: 10 }}
              items={[
                {
                  key: "nested",
                  label: "Nested Fields",
                  children: (
                    <SchemaBuilder
                      onSchemaChange={(childFields) => {
                        if (Array.isArray(childFields)) {
                          updateNestedFields(idx, childFields);
                        }
                      }}
                    />
                  ),
                },
              ]}
            />
          )}
        </div>
      ))}

      <Button type="primary" onClick={addField}>
        Add Field
      </Button>
    </>
  );
}

export default SchemaBuilder;
