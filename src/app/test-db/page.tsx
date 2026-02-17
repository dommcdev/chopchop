import { db } from "@/db";
import { users } from "@/db/schema";
import { addUser, deleteUser } from "./actions";

export default async function TestDbPage() {
  let allUsers: { id: number; username: string }[] = [];
  let connectionStatus = "checking...";
  let errorMessage = "";

  try {
    allUsers = await db.select().from(users);
    connectionStatus = "connected";
  } catch (error) {
    connectionStatus = "error";
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  return (
    <div
      style={{ padding: "50px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h1>Database Test</h1>

      <div
        style={{
          padding: "15px",
          marginBottom: "20px",
          backgroundColor:
            connectionStatus === "connected" ? "#e8f5e9" : "#ffebee",
          borderRadius: "5px",
        }}
      >
        <strong>Status:</strong> {connectionStatus}
        {connectionStatus === "connected" && (
          <span>
            {" "}
            ({allUsers.length} user{allUsers.length !== 1 ? "s" : ""})
          </span>
        )}
        {errorMessage && (
          <div style={{ color: "#c62828", marginTop: "10px" }}>
            Error: {errorMessage}
          </div>
        )}
      </div>

      {connectionStatus === "connected" && (
        <>
          <h2>Add User:</h2>
          <form action={addUser} style={{ marginBottom: "30px" }}>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              required
              style={{ padding: "10px", marginRight: "10px", fontSize: "16px" }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Add User
            </button>
          </form>

          <h2>Users:</h2>
          {allUsers.length === 0 ? (
            <p style={{ color: "#666" }}>No users yet. Add one above!</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {allUsers.map((user) => (
                <li
                  key={user.id}
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                    background: "#f5f5f5",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <strong>ID {user.id}:</strong> {user.username}
                  </span>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <button
                      type="submit"
                      style={{
                        padding: "5px 15px",
                        background: "#c62828",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
