export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Form Builder API</h1>
      <p>Backend is running. API available at /api/*</p>
      <ul>
        <li>POST /api/auth/register - Register new user</li>
        <li>POST /api/auth/login - Login user</li>
        <li>GET /api/forms - List all forms (requires auth)</li>
        <li>POST /api/forms - Create form (requires auth)</li>
        <li>GET /api/forms/[id] - Get form details (requires auth)</li>
        <li>PATCH /api/forms/[id] - Update form (requires auth)</li>
        <li>DELETE /api/forms/[id] - Delete form (requires auth)</li>
      </ul>
    </div>
  );
}
