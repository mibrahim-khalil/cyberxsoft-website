import { useRouteError } from "react-router-dom";

import "../features/services/services.css";

/*
 * Shown when a page fails to load or crashes, instead of the router's
 * technical default error screen. Plain links are used on purpose so
 * the page still works if the router itself is the thing that failed.
 */
export default function RouteError() {
  const error = useRouteError();

  if (import.meta.env.DEV) {
    console.error(error);
  }

  return (
    <main className="notfound" data-tone="dark" id="main">
      <div className="container notfound__inner">
        <span className="notfound__code" aria-hidden="true">
          Oops
        </span>
        <h1 className="notfound__title">Something went wrong</h1>
        <p className="t-lead">
          This page could not be shown. Please try again, or return to the home page.
        </p>
        <div className="btn-row">
          <a className="btn btn--primary" href="/" style={{ paddingRight: 28 }}>
            Return to Home
          </a>
          <a className="btn btn--glass" href="/contact" style={{ paddingRight: 28 }}>
            Contact us
          </a>
        </div>
      </div>
    </main>
  );
}
