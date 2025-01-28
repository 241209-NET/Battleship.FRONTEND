import "./css/NotFound.css"

export default function NotFound() {
  return (
    <>
      <div className="container">
        <h1 className="error-number">404</h1>
        <p className="page-not-found-message">Sorry this page does not exist.</p>
      </div>
    </>
  );
}
