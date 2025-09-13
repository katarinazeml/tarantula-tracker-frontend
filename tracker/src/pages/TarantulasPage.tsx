import React, { useEffect, useState } from "react";
import { getTarantulas, createTarantula, deleteTarantula } from "../api/api";
import TarantulaForm from "../components/TarantulaForm";

const TarantulasPage: React.FC = () => {
  const [tarantulas, setTarantulas] = useState<any[]>([]);

  const fetchTarantulas = async () => {
    const res = await getTarantulas();
    setTarantulas(res.data);
  };

  useEffect(() => {
    fetchTarantulas();
  }, []);

  const handleCreate = async (data: any) => {
    await createTarantula(data);
    fetchTarantulas();
  };

  const handleDelete = async (id: number) => {
    await deleteTarantula(id);
    fetchTarantulas();
  };

  return (
    <div className="container">
      <h1>Tarantulas</h1>
      <TarantulaForm onSubmit={handleCreate} />

      {tarantulas.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <h2>Your Tarantulas</h2>
          <ul className="tarantula-list">
            {tarantulas.map((t) => (
              <li key={t.id}>
                <div>
                  <strong>{t.name}</strong> - {t.species}
                  {t.commonName && <span> ({t.commonName})</span>}
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Owner ID: {t.userId}
                  </div>
                </div>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TarantulasPage;
