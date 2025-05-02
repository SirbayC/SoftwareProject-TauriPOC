export default App

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { open } from '@tauri-apps/plugin-dialog';
import { readTextFile } from "@tauri-apps/plugin-fs";
import duckdb from '@duckdb/node-api';
import * as d3 from "d3";
import LinePlot from "./LinePlot";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  const readFileContents = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
      });
      if (!selectedPath) return;
      setContent(await readTextFile(selectedPath as string));
    } catch (err) {
      console.error(err);
    }
  };

  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));
  // console.log(duckdb.version)
  function onMouseMove(event) {
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }

  return (
    <main className="container">
      <div>
        <button onClick={readFileContents}>
          Select file
        </button>
        <div>
          Content from file: "{content}"
        </div>
      </div>
      <hr />
      <div onMouseMove={onMouseMove}>
        <LinePlot data={data} />
      </div>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}
