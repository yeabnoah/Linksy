import { useState } from "react";
import axios from "axios";
import { LLMResponse, mapLLMResponseToAPIParams } from "../util/queryMapper";

interface responseInterface {
  id: number;
  url: string;
  title: string;
}

export default function SearchAssistant() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<responseInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const llmResponse = await axios.post("/api/llm", { query });
      const structuredQuery = llmResponse.data;

      const params = mapLLMResponseToAPIParams(structuredQuery as LLMResponse);

      const response = await axios.get(`/api/search?${params.toString()}`);
      setResults(response.data as responseInterface[]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ask me to find bookmarks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
      />
      <button onClick={handleSearch} disabled={loading} className="button">
        {loading ? "Searching..." : "Search"}
      </button>
      <ul>
        {results.map((bookmark) => (
          <li key={bookmark.id}>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
