import "./App.css";
import { Editor } from "./feature/Editor";
import messageBlock from "./feature/Editor/blocks/message";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Editor
          blocks={[messageBlock]}
          value={{
            id: "1",
            content: [
              {
                title: "заголовок",
                fields: [],
              },
              {
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
