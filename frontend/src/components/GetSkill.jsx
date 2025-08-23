import React, { useState } from "react";

function SkillsByEmail() {
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchSkills = async () => {
    if (!email.trim()) {
      alert("Please enter an email");
      return;
    }
    setLoading(true);
    setError("");
    setSkills([]);
    setUsername("");
    try {
      // Create query string with email
      const params = new URLSearchParams({ email: email.trim() });
      const res = await fetch(
        `http://localhost:5000/api/skills?${params.toString()}`
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch skills");
      }
      const data = await res.json();
      setUsername(data.username);
      setSkills(data.works || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Fetch Skills by Email</h2>
      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleFetchSkills}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Skills"}
      </button>
      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      {username && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">
            Skills uploaded by {username}:
          </h3>
          {skills.length === 0 && <p>No skills found.</p>}
          <ul className="list-disc pl-5 space-y-2">
            {skills.map((skill) => (
              <li key={skill._id}>
                <p>
                  <strong>Category:</strong> {skill.category} <br />
                  <strong>Subcategory:</strong> {skill.subcategory}
                </p>
                {skill.image && skill.image.length > 0 && (
                  <img
                    src={skill.image[0]}
                    alt={`${skill.category} skill`}
                    style={{
                      maxWidth: "200px",
                      marginTop: "4px",
                      borderRadius: "6px",
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SkillsByEmail;
