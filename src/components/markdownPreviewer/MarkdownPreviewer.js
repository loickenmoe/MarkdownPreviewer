import React, { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify"; // Add this line
import { FaArrowsAlt, FaCompressAlt, FaFreeCodeCamp } from "react-icons/fa";
import "highlight.js/styles/github.css"; // Import a highlight.js CSS style
import hljs from "highlight.js";
import "../../styles/markdownPreviewer.css";

// Configure marked to use highlight.js and interpret carriage returns as <br>
marked.setOptions({
  breaks: true, // Enable line breaks
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});

/**
 * MarkdownPreviewer component renders a markdown editor and a previewer.
 * 
 * @component
 * @example
 * return (
 *   <MarkdownPreviewer />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @description
 * This component allows users to write markdown text in a textarea and see the rendered HTML preview in real-time.
 * It includes functionality to toggle full-screen mode for both the editor and the previewer.
 * 
 * @property {string} defaultMarkdown - The default markdown text displayed in the editor.
 * @property {Array} markdown - The current markdown text state.
 * @property {boolean} isFullScreen - State to manage full-screen mode for the editor.
 * @property {boolean} isPreviewFullScreen - State to manage full-screen mode for the previewer.
 * 
 * @function handleChange - Updates the markdown state when the user types in the textarea.
 * @param {Object} event - The event object from the textarea input.
 * 
 * @function toggleFullScreen - Toggles the full-screen mode for the editor.
 * 
 * @function tooglePreviewFullScreen - Toggles the full-screen mode for the previewer.
 * 
 * @requires react
 * @requires DOMPurify
 * @requires marked
 * @requires react-icons/fa
 */
const MarkdownPreviewer = () => {
  const defaultMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<span style="background-color: white;"><div></div></span>\`, between 2 backticks.

\`\`\`javascript
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine === '\`\`\`' && lastLine === '\`\`\`') {
    return "multiLineCode"; // Ensure multiLineCode is defined elsewhere
  }
}
\`\`\`

You can also make text **bold**... whoa!  
Or _italic_.  
Or... wait for it... **_both!_**  
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

| Wild Header | Crazy Header | Another Header? |
|-------------|--------------|-----------------|
| Your content can be here, and it | can be here.... | okay. |
| And here.    | Okay.        | I think we get it. |

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. But the list goes on...

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const tooglePreviewFullScreen = () => {
    setIsPreviewFullScreen((prev) => !prev);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#87B5B5",
      }}
    >
      {!isPreviewFullScreen && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "70%",
              backgroundColor: "#4AA3A3",
              borderRadius: "5px 5px 0 0",
              padding: "10px",
              maxWidth: "600px",
              boxShadow: "1px 1px 10px 2px #3a5f5f",
              border: "1px solid #000000",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: "bold",
              }}
            >
              <FaFreeCodeCamp />
              <small>Editor</small>
            </div>
            <div>
              {isFullScreen ? (
                <FaCompressAlt className="icon" onClick={toggleFullScreen} />
              ) : (
                <FaArrowsAlt className="icon" onClick={toggleFullScreen} />
              )}
            </div>
          </div>
          <textarea
            id="editor"
            style={{
              width: "70%",
              maxWidth: "600px",
              height: isFullScreen ? "calc(100vh - 60px)" : "200px",
              marginBottom: "20px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "0 0 5px 5px",
              outline: "none",
              backgroundColor: "#C0D8D8",
              border: "1px solid #000000",
              borderTop: "none",
              boxShadow: "1px 1px 10px 2px #3a5f5f",
            }}
            value={markdown}
            onChange={handleChange}
          ></textarea>
        </>
      )}

      {!isFullScreen && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              backgroundColor: "#4AA3A3",
              maxWidth: "800px",
              borderRadius: "5px 5px 0 0",
              padding: "10px",
              border: "1px solid #000000",
              borderBottom: "none",
              boxShadow: "1px 1px 10px 2px #3a5f5f",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: "bold",
              }}
            >
              <FaFreeCodeCamp />
              <small>Preview</small>
            </div>
            <div>
              {isPreviewFullScreen ? (
                <FaCompressAlt
                  className="icon"
                  onClick={tooglePreviewFullScreen}
                />
              ) : (
                <FaArrowsAlt
                  className="icon"
                  onClick={tooglePreviewFullScreen}
                />
              )}
            </div>
          </div>
          <div
            id="preview"
            style={{
              width: "90%",
              maxWidth: "800px",
              minHeight: "200px",
              padding: "10px",
              textAlign: "left",
              borderRadius: "0 0 5px 5px",
              backgroundColor: "#C0D8D8",
              overflowX: "scroll",
              border: "1px solid #000000",
              boxShadow: "1px 1px 10px 2px #3a5f5f",
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(markdown)),
            }} // Sanitize the HTML
          ></div>
        </>
      )}
    </div>
  );
};

export default MarkdownPreviewer;
