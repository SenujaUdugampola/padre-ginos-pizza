import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createLazyFileRoute('/menu')({
  component: MenuComponent,
})

function MenuComponent() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pizzasPerPage] = useState(6);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching pizzas from API...");
        const response = await fetch('/api/pizzas');
        const data = await response.json();
        console.log("Received pizzas:", data);
        setPizzas(data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="menu-loading">
        <h1>Loading our delicious menu...</h1>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(pizzas.length / pizzasPerPage);
  const startIndex = (currentPage - 1) * pizzasPerPage;
  const endIndex = startIndex + pizzasPerPage;
  const currentPizzas = pizzas.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="order-page" style={{ 
      gridTemplateColumns: '1fr', 
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 30px 0 20px'
    }}>
      <div className="order" style={{ width: '100%', marginLeft: '-20px' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px', 
          padding: '30px 20px',
          background: 'var(--background)',
          borderRadius: '15px',
          width: '100%',
          maxWidth: '100%'
        }}>
          <h2 style={{ 
            marginBottom: '20px',
            fontSize: '48px',
            fontWeight: 'normal',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>Padre Gino's Pizza Menu</h2>
          <p style={{ 
            fontSize: '18px',
            fontStyle: 'italic',
            color: 'var(--secondary)',
            marginBottom: '10px'
          }}>Fresh Italian pizzas made with love!</p>
          <p style={{ 
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#333',
            marginBottom: '15px'
          }}><strong>Menu loaded successfully! ({pizzas.length} pizzas available)</strong></p>
          <div style={{ 
            background: 'var(--background)',
            padding: '15px 25px',
            borderRadius: '25px',
            border: '2px solid var(--primary)',
            display: 'inline-block',
            fontWeight: 'bold',
            color: 'var(--primary)'
          }}>
            Showing {startIndex + 1}-{Math.min(endIndex, pizzas.length)} of {pizzas.length} pizzas (Page {currentPage} of {totalPages})
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '30px',
          marginTop: '30px',
          width: '100%',
          justifyItems: 'center'
        }}>
          {currentPizzas.map(pizza => (
            <div key={pizza.id} className="order-pizza" style={{ 
              background: 'var(--background)',
              borderRadius: '10px',
              padding: '20px',
              width: '100%',
              maxWidth: '400px',
              border: '1px solid var(--border)'
            }}>
              <div className="pizza">
                <img 
                  src={pizza.image} 
                  alt={pizza.name}
                  onError={(e) => {
                    e.target.src = "https://picsum.photos/300/200";
                  }}
                />
                <h1 style={{ textAlign: 'center' }}>{pizza.name}</h1>
                <p style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', margin: '5px 0', textAlign: 'center' }}>{pizza.category}</p>
                <p style={{ margin: '10px 0', lineHeight: '1.5', textAlign: 'center' }}>{pizza.description}</p>
                
                <div style={{ marginTop: '20px' }}>
                  <h4 style={{ color: 'var(--secondary)', marginBottom: '15px', fontSize: '18px' }}>Sizes & Prices:</h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
                    gap: '10px'
                  }}>
                    {Object.entries(pizza.sizes || {}).map(([size, price]) => (
                      <div key={size} style={{ 
                        background: 'var(--background)', 
                        padding: '10px 15px', 
                        borderRadius: '8px', 
                        border: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>{size.toUpperCase()}</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>${price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pages" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '40px 0',
            gap: '20px'
          }}>
            <button 
              onClick={goToPrevious}
              disabled={currentPage === 1}
              style={{
                opacity: currentPage === 1 ? '0.5' : '1',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Previous
            </button>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    style={{
                      backgroundColor: currentPage === page ? 'var(--primary)' : 'transparent',
                      color: currentPage === page ? 'white' : 'var(--primary)',
                      minWidth: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <button 
              onClick={goToNext}
              disabled={currentPage === totalPages}
              style={{
                opacity: currentPage === totalPages ? '0.5' : '1',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next →
            </button>
          </div>
        )}

        {pizzas.length > pizzasPerPage && (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div style={{ color: 'var(--secondary)', fontFamily: 'var(--font)', fontSize: '20px' }}>
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        <div style={{ 
          textAlign: 'center', 
          marginTop: '50px', 
          padding: '30px',
          background: 'var(--background)',
          borderRadius: '10px'
        }}>
          <p style={{ marginBottom: '15px', lineHeight: '1.6', color: 'var(--secondary)' }}>All pizzas are made fresh to order with our signature dough and premium toppings.</p>
          <p>Ready to order? <a href="/order" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'underline' }}>Place your order here!</a></p>
        </div>
      </div>
    </div>
  )
}
