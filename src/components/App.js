import '../styles/app.css';
import Header from "./header/Header"
import MarkdownPreviewer from './markdownPreviewer/MarkdownPreviewer';


function App() {
  return (
    <div className="App">
      <Header />
      <MarkdownPreviewer />
    </div>
  );
}

export default App;
