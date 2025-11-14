# 🚀 traceit-express
A lightweight, plug-and-play logging middleware for Express.  
Tracks request performance, API failures, and runtime errors — with clean structured logs and pluggable storage (MongoDB by default).

Built to be fast, minimal, and production-ready.

---

## ✨ Features
- ⚡ Zero-config Express request logger
- 🛠 Full error logger with message + stack trace
- 🧩 Works with your existing **mongoose** instance
- 🔌 Pluggable storage (Mongo, file, SQL, HTTP, custom)
- 🚦 Detect slow requests (configurable threshold)
- 📊 Skip un-required status-codes
- 🕵 Mask sensitive fields (password, token, etc.)
- 🆔 Automatic unique request IDs
- 💡 Clean console output (optional)
- 🔇 Silent and safe — never crashes your app

---

## 📦 Installation

```bash
npm install traceit-express
```

---

## ⚡ Quick Start

```js
const express = require("express");
const mongoose = require("mongoose");

const { requestLogger, errorLogger } = require("traceit-express");
const mongoStorage = require("traceit-express/storage/mongoStorage");

mongoose.connect(process.env.MONGO_URI);

const app = express();
const storage = mongoStorage(mongoose);

app.use(requestLogger({ mongoose, storage }));
app.use(errorLogger({ mongoose, storage }));

app.listen(3000, () => console.log("Server running"));
```

---

## 🧩 What gets logged

### **Request logs**
- Method  
- Route  
- Status  
- Duration (ms)  
- IP  
- User-agent  
- Body (optional)  
- Query + params  
- User context (if present)  
- Request ID  
- Timestamp  

### **Error logs**
Everything above **plus:**
- Error message  
- Error stack trace  

---

## ⚙️ Configuration Options

```js
requestLogger({
  product_id: "my-service",
  slowThreshold: 10000,       // mark requests slower than 10s
  ignoreRoutes: ["/health"],
  ignoreStatusCodes: [304],
  maskFields: ["password", "token"],
  logRequestBody: false,
  enableConsole: true,        // pretty console output
  mongoose,
  storage
});
```

---

## 🕵 Console Output Example

```
GET /api/users → 200 (12ms)
POST /api/login → 400 (3ms)
GET /api/reports → 200 (12033ms) SLOW
```

---

## 🗂 Example Log (MongoDB)

```json
{
  "product_id": "my-service",
  "requestId": "req_18f3c2e7a9b1",
  "method": "GET",
  "route": "/api/orders",
  "status": 500,
  "duration": 8,
  "ip": "::1",
  "ua": "Mozilla/5.0",
  "query": {},
  "params": {},
  "error": {
    "message": "Test Error",
    "stack": "Error: Test Error..."
  },
  "createdAt": "2025-11-14T10:33:12.124Z"
}
```

---

## 🤝 Contributing

Contributions, improvements, and new storage adapters are welcome.

---

## 📄 License

MIT License © 2025
