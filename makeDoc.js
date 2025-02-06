function createDocument() {
    // Create a new document
    let doc = document.implementation.createHTMLDocument("Formatted Document");
    
    // Add styles to the document
    let style = doc.createElement("style");
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    `;
    doc.head.appendChild(style);
    
    // Create and append elements
    let container = doc.createElement("div");
    container.className = "container";
    
    let title = doc.createElement("h1");
    title.textContent = "My Formatted Document";
    
    let paragraph = doc.createElement("p");
    paragraph.textContent = "This is a dynamically generated document with proper formatting, including structured headings, paragraphs, and styles.";
    
    // Append elements to container
    container.appendChild(title);
    container.appendChild(paragraph);
    
    // Append container to body
    doc.body.appendChild(container);
    
    // Open the document in a new window
    let win = window.open("", "", "width=800,height=600");
    win.document.write(doc.documentElement.outerHTML);
    win.document.close();
}

// Run the function to generate the document
createDocument();
