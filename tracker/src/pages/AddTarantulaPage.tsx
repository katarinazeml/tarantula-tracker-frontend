import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTarantula } from "../api/api";
import TarantulaForm from "../components/TarantulaForm";
import Header from "../components/Header";

const AddTarantulaPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = async (data: any) => {
    await createTarantula(data);
    navigate('/tarantulas');
  };

  return (
    <div className="container">
      <Header />

      <div style={{ marginBottom: '24px' }}>
        <Link to="/tarantulas" style={{ color: '#a855f7', textDecoration: 'none' }}>
          ← Back to My Tarantulas
        </Link>
      </div>

      <TarantulaForm onSubmit={handleCreate} />
    </div>
  );
};

export default AddTarantulaPage;
