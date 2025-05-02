# Tauri + React + Typescript
Basic PoC showing how Tauri can be used for reading the content of a file through an OS file selection dialog, and how it integrates with the D3 JS graphing framework.
<img width="995" alt="image" src="https://github.com/user-attachments/assets/85c4b629-42ca-4d3b-b9d4-f38bf46f43ad" />


Revealed an important limitation that in order to use DuckDB, the Rust client api should be used, as Node is not included as part of Tauri, yielding the following error: "node_modules/@duckdb/node-bindings/duckdb.js:17:27: ERROR: No loader is configured for ".node" files: node_modules/@duckdb/node-bindings-win32-x64/duckdb.node"
![image](https://github.com/user-attachments/assets/6c535b26-3083-4fd6-8847-8fd36b969ba8)
