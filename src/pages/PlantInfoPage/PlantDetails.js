import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlantDetail = () => {
  const { plantId } = useParams(); // Extract plant ID from the URL
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Plant ID from URL:", plantId); // Debugging

    async function fetchPlantDetails() {
      try {
        const response = await axios.get(
          `https://perenual.com/api/species/details/${plantId}?key=sk-wgqV67da6ec4ac1159229`
        );

        console.log("API Response:", response.data); // Debugging

        setPlantData(response.data);
      } catch (error) {
        console.error("Error fetching plant details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (plantId) {
      fetchPlantDetails();
    }
  }, [plantId]);

  if (loading) return <div style={{ fontSize: "2rem", textAlign: "center" }}>🌿 Loading...</div>
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!plantData) return <p>No plant data found</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>{plantData.common_name || "Unknown Plant"}</h1>
      <h3>
        <i>{plantData.scientific_name?.join(", ") || "Scientific Name Not Available"}</i>
      </h3>

      {plantData.default_image?.original_url ? (
        <img
          src={plantData.default_image.original_url}
          alt={plantData.common_name}
          style={{
            width: "60%",
            height: "300px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
      ) : (
        <p>No image available</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(plantData).map(([key, value]) => {
          if (!value || key === "id" || key === "default_image") return null;

          return (
            <li key={key} style={{ marginBottom: "10px" }}>
              <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong>{" "}
              {Array.isArray(value) ? value.join(", ") : value.toString()}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlantDetail;
