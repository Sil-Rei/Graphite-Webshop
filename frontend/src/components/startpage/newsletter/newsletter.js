import "./newsletter.css";

function Newsletter() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="newsletter-container">
      <h2 className="newsletter-heading">10% off your first purchase?</h2>
      <p className="newsletter-text">Sign up for our newsletter</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input className="newsletter-input" type="text" placeholder="email" />
        <button className="newsletter-button" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
