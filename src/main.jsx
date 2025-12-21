import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// #region agent log - Global error handlers
window.addEventListener('error', (e) => {
  fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:error',message:'GLOBAL ERROR',data:{message:e.message,filename:e.filename,lineno:e.lineno,colno:e.colno,error:e.error?.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
});
window.addEventListener('unhandledrejection', (e) => {
  fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:unhandledrejection',message:'UNHANDLED PROMISE REJECTION',data:{reason:e.reason?.toString(),error:e.reason?.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
});
fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:7',message:'App initialization start',data:{rootExists:!!document.getElementById("root")},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// #region agent log
fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:10',message:'App render complete',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion