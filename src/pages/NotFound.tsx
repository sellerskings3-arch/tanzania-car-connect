import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-bold font-display text-foreground">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Samahani! Ukurasa huu haujapatikana</p>
        <a href="/" className="text-primary underline hover:text-primary/90 font-medium">
          Rudi Nyumbani
        </a>
      </div>
    </div>
  );
};

export default NotFound;
