import "./App.css";
import { Editor } from "./feature/Editor";
import buttonBlock from "./feature/Editor/blocks/button";
import messageBlock from "./feature/Editor/blocks/message";
import { v4 as uuidv4 } from "uuid";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Editor
          blocks={[messageBlock, buttonBlock]}
          value={{
            id: "1",
            content: [
              {
                id: uuidv4(),
                title: "заголовок",
                fields: [],
              },
              {
                id: uuidv4(),
                title: "заголовок",
                fields: [],
              },
              {
                id: uuidv4(),
                title: "заголовок",
                fields: [],
              },
              {
                id: uuidv4(),
                title: "заголовок",
                fields: [],
              },
            ],
          }}
        />
      </header>
    </div>
  );
}

export default App;
