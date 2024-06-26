import { useState } from "react";
import "./Registration.css";
import { Loader } from "./Loader";

export const Registration = ({ setIsRegistering }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://auth-s0og.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
        setIsLoading(false);

        // Redirect to the sign-in form after successful registration
        setTimeout(() => {
          setIsRegistering(false);
        }, 2000); // Redirect after 2 seconds
      } else {
        setMessage(result.message || "Registration failed!");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Reset isLoading after form submission is completed
    }
  };

  return (
    <div className="container">
      <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Anna Andersson"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="anna.andersson@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="password123"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {isLoading && (
          <div className="loading-container">
            <Loader />
          </div>
        )}
        <p>{message}</p>
        <p>
          Already have an account?{" "}
          <a
            href="#"
            className="login-link"
            onClick={() => setIsRegistering(false)}
          >
            Sign in
          </a>
        </p>
      </>
    </div>
  );
};
