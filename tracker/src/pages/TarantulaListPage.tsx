import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTarantulas, deleteTarantula } from "../api/api";
import Header from "../components/Header";

const TarantulaListPage: React.FC = () => {
  const [tarantulas, setTarantulas] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTarantulas = async () => {
    try {
      setIsLoading(true);
      const res = await getTarantulas();
      setTarantulas(res.data);
      setError("");
    } catch (err: any) {
      setError("Failed to load tarantulas. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTarantulas();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: number, name: string) => {
    e.preventDefault(); // Prevent navigation to detail page
    e.stopPropagation(); // Stop event bubbling

    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    setError("");

    try {
      await deleteTarantula(id);
      await fetchTarantulas();
    } catch (err: any) {
      console.error("Delete error:", err);
      if (err.response?.data?.error) {
        setError(`Failed to delete tarantula: ${err.response.data.error}`);
      } else if (err.message) {
        setError(`Failed to delete tarantula: ${err.message}`);
      } else {
        setError("Failed to delete tarantula. Please try again.");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container">
      <Header />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>My Tarantulas</h1>
        <Link
          to="/tarantulas/new"
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
            border: '1px solid rgba(168, 85, 247, 0.5)'
          }}
        >
          🕷️ Add New Tarantula
        </Link>
      </div>

      {error && (
        <div style={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          color: '#dc2626',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
          <p>Loading tarantulas...</p>
        </div>
      ) : tarantulas.length > 0 ? (
        <ul className="tarantula-list">
          {tarantulas.map((t) => (
            <li key={t.id}>
              <Link
                to={`/tarantulas/${t.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <strong style={{
                      fontSize: '18px',
                      color: '#e5e7eb',
                      transition: 'color 0.3s ease'
                    }}>
                      {t.name}
                    </strong>
                    {t.photoUrl && (
                      <img
                        src={t.photoUrl}
                        alt={t.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid rgba(168, 85, 247, 0.3)'
                        }}
                      />
                    )}
                  </div>

                  <div style={{ color: '#c084fc', marginBottom: '4px' }}>
                    <em>{t.species}</em>
                    {t.commonName && <span> ({t.commonName})</span>}
                  </div>

                  <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {t.sex && <span>Sex: {t.sex}</span>}
                    {t.legSpan && <span>Leg Span: {t.legSpan}cm</span>}
                    {t.weight && <span>Weight: {t.weight}g</span>}
                    <span>Owner ID: {t.userId}</span>
                  </div>

                  {t.notes && (
                    <div style={{
                      fontSize: '13px',
                      color: '#d1d5db',
                      marginTop: '8px',
                      fontStyle: 'italic',
                      maxWidth: '400px'
                    }}>
                      {t.notes.length > 100 ? `${t.notes.substring(0, 100)}...` : t.notes}
                    </div>
                  )}
                </div>
              </Link>

              <button
                onClick={(e) => handleDelete(e, t.id, t.name)}
                disabled={deletingId === t.id}
                style={{
                  opacity: deletingId === t.id ? 0.6 : 1,
                  cursor: deletingId === t.id ? 'not-allowed' : 'pointer',
                  marginLeft: '12px'
                }}
              >
                {deletingId === t.id ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '64px 24px',
          background: 'linear-gradient(145deg, rgba(15, 15, 30, 0.8), rgba(26, 26, 46, 0.8))',
          borderRadius: '12px',
          border: '2px dashed rgba(168, 85, 247, 0.3)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🕷️</div>
          <h3 style={{ color: '#c084fc', marginBottom: '12px' }}>No tarantulas added yet</h3>
          <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
            Start building your collection by adding your first tarantula!
          </p>
          <Link
            to="/tarantulas/new"
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
              border: '1px solid rgba(168, 85, 247, 0.5)'
            }}
          >
            🕷️ Add Your First Tarantula
          </Link>
        </div>
      )}
    </div>
  );
};

export default TarantulaListPage;
