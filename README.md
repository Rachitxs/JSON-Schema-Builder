# 🧩 JSON Schema Builder

A dynamic React-based tool for building and previewing JSON schema-like sample data interactively.  
Built with **React**, **Ant Design**, **React Hook Form**, and **Vite**.

---

## 🚀 Features

- ⚡ Add multiple field types: `string`, `number`, `float`, `boolean`, `objectid`, `array`, `nested`
- 📦 Nested field support (multi-level)
- ✅ Toggle required/optional for each field
- 📝 Live JSON sample preview
- 🧼 Clean UI using Ant Design v5
- 💾 Submit and handle schema for export / API use

---

## 🖼️ Preview

![App Screenshot](https://via.placeholder.com/1000x300.png?text=Screenshot+Coming+Soon)

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Ant Design](https://ant.design/)
- [Vite](https://vitejs.dev/)
- [React Hook Form (optional)](https://react-hook-form.com/)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/json-schema-builder.git
cd json-schema-builder
npm install
npm run dev


src/
├── components/
│   └── SchemaBuilder.jsx
├── App.jsx
└── main.jsx



{
  "name": "string",
  "profile": {
    "email": "string",
    "verified": true
  },
  "tags": ["string"]
}
