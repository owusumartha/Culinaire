import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container"><h1>Our Story</h1></div>
      </section>

      <section className="section">
        <div className="container about-banner">
          <div>
            <h2>Who We Are</h2>
            <p>At Culinaire, we believe the kitchen is the heart of the home. Our mission is to bring you premium kitchenware that combines timeless design with modern functionality.</p>
            <p>From professional-grade cookware to elegant dinnerware, every piece is carefully selected to enhance your cooking experience. Based in Konongo, Ghana, we serve home cooks and chefs across the country.</p>
            <div className="stat">
              <div><h3>500+</h3><span>Happy Customers</span></div>
              <div><h3>36+</h3><span>Premium Products</span></div>
              <div><h3>4.8★</h3><span>Average Rating</span></div>
            </div>
            <Link href="/shop" className="btn btn-gold" style={{ marginTop: 24 }}>Shop Our Collection</Link>
          </div>
          <img src="/images/matt black cookware.jpg" alt="Culinaire quality cookware" />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="icon">🎯</div>
              <h4>Our Mission</h4>
              <p>To make premium kitchenware accessible to every home cook in Ghana, combining quality craftsmanship with affordable pricing.</p>
            </div>
            <div className="feature">
              <div className="icon">⭐</div>
              <h4>Quality First</h4>
              <p>Every product is hand-picked and tested. We partner with trusted brands to ensure lasting durability and performance.</p>
            </div>
            <div className="feature">
              <div className="icon">❤️</div>
              <h4>Customer Obsessed</h4>
              <p>Your satisfaction is our priority. From fast delivery to responsive support, we go above and beyond for every order.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
