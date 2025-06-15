export const prompt = `
You are an expert open-source maintainer and technical writer.

I am sharing summaries of all source files and documentation from a GitHub project.

Based on these summaries, generate a complete and professional "README.md" file that follows the structure below.

---

### 📝 README Structure:

0. **Badges (Optional)**
   - Add status badges for build, tests, coverage, etc.
   - Example:
     ![Build](https://img.shields.io/github/actions/workflow/status/username/repo/ci.yml)
     ![License](https://img.shields.io/github/license/username/repo)

1. **Project Title**
   - Clear, concise name of the project
   - One-liner description

2. **Project Overview**
   - What the project does
   - Key features and functionality
   - Use cases or examples
   - Any visuals or diagrams (mention as placeholders)

3. **Tech Stack**
   - Languages, frameworks, tools used
   - Any APIs or services (e.g., Gemini, LangChain, GitHub Loader, etc.)

4. **Project Structure**
   - Full file and folder hierarchy in a tree-style format
   - Include subdirectories and files
   - Provide a short description of important files and folders
   - Example:
     \`\`\`
     📦 project-root
     ┣ 📂 backend
     ┃ ┣ 📜 server.js - Entry point of the API
     ┃ ┣ 📂 routes - Contains route definitions
     ┃ ┣ 📂 controllers - Contains logic for route handlers
     ┃ ┣ 📂 models - Contains Mongoose schemas
     ┃ ┣ 📂 middleware - Contains custom middleware like error handling
     ┃ ┗ 📜 .env - Configuration file with environment variables
     ┣ 📂 frontend (if present)
     ┃ ┗ 📜 index.html
     ┗ 📜 README.md
     \`\`\`

5. **Getting Started**
   - Prerequisites (Node.js, Python, Go, Rust, C++, MongoDB, etc.)
   - Installation instructions
   - How to build (if needed)
   - How to run the project locally
   - How to set up environment variables
   - Example:
     \`\`\`bash
     git clone https://github.com/username/repo.git
     cd repo/backend
     npm install
     npm start
     \`\`\`

   > 🔧 Note: Replace commands above depending on the detected language or framework. Examples:
   >
   > - Python: \`python main.py\`, \`pip install -r requirements.txt\`
   > - Go: \`go run main.go\`
   > - Rust: \`cargo run\`
   > - C++: \`g++ main.cpp -o main && ./main\`

6. **API Documentation**
   - List all endpoints with:
     - HTTP method and path
     - Description of functionality
     - Request body (if any)
     - Example request and response
     - Status codes and possible errors
   - Example:
     \`\`\`
     POST /users
     Description: Create a new user
     Request:
     {
       "name": "John",
       "email": "john@example.com",
       "age": 30
     }
     Response (201):
     {
       "message": "User created successfully",
       "user": {
         "_id": "id",
         "name": "John"
       }
     }

     GET /users/:id
     Description: Get details of a specific user
     Response (200):
     {
       "name": "John",
       "email": "john@example.com"
     }

     Error (404):
     {
       "message": "User not found"
     }
     \`\`\`

7. **Examples**
   - Include working input/output pairs
   - Console logs or API responses
   - Markdown code blocks preferred
   - Example:
     \`\`\`bash
     curl -X GET http://localhost:3000/users
     \`\`\`
     Response:
     \`\`\`json
     [
       {
         "name": "John",
         "email": "john@example.com"
       }
     ]
     \`\`\`

8. **Running Tests**
   - Mention if unit or integration tests exist
   - How to run them:
     \`\`\`bash
     npm test
     # or
     pytest
     # or
     go test ./...
     \`\`\`

9. **Command Line Interface (CLI)** (Optional)
   - Usage examples for CLI tools (if any)
   - Example:
     \`\`\`bash
     ./mytool --help
     ./mytool generate --name "example"
     \`\`\`

10. **Contributing**
    - Mention how others can contribute
    - Example:
      \`\`\`
      - Fork the repository
      - Create a new branch
      - Submit a pull request
      \`\`\`

11. **License**
    - Include the license name and file if available (e.g., MIT License)

12. **Credits**
    - Acknowledge contributors, third-party libraries, and tools used

---

### Notes:
- Be as thorough as possible.
- Extract all useful details from summaries, even if scattered.
- Format everything in clean Markdown using headings, bullet points, and code blocks.
- **DO NOT invent endpoints, features, or files** — only include what is available in the input summaries.
- If any section is missing in the summaries, insert a placeholder or write generic guidance like:
  _"This section could include X if available in code."_

---

### Input (Summaries from code files):
<insert summaries here>
`;
