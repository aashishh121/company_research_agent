import React, { useState } from "react";

const ResearchCompany = () => {
  const [company, setCompany] = useState("");
  const [data, setData] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);

  const researchCompany = async () => {
    if (company == "") return;
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company }),
      });
      const result = await response.json();
      console.log(result, "result");
      if (result.info) {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter company name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={researchCompany}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {data ? (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {data.info.company_name}
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            Founded in {data.info.founding_year}
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mb-2">Founders</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.info.founder_names.map((name: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {name}
              </span>
            ))}
          </div>

          <hr className="my-4 border-gray-200" />

          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            About the Product
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.info.product_description}
          </p>

          <hr className="my-4 border-gray-200" />

          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Funding Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.info.funding_summary}
          </p>
        </div>
      ) : (
        "No Data Found"
      )}
    </div>
  );
};

export default ResearchCompany;
