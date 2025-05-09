import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const [destinationName, setDestinationName] = useState(null);

  // Get full path
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Check if we are in a destination page
  const destinationIndex = pathnames.findIndex((p) => p === 'destinations');
  const destinationId = destinationIndex !== -1 ? pathnames[destinationIndex + 1] : null;

  // Fetch destination name if destinationId exists
  useEffect(() => {
    if (destinationId) {
      fetch(`http://localhost:3000/destinations/${destinationId}`)
        .then((res) => res.json())
        .then((data) => setDestinationName(data.name))
        .catch(() => setDestinationName(null));
    }
  }, [destinationId]);

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>

      {pathnames.map((value, index) => {
        const isDestination = value === 'destinations';
        const isDestinationId = index === destinationIndex + 1;

        // Skip "destinations" keyword
        if (isDestination) return null;

        const isLast = index === pathnames.length - 1;

        // Destination id → show destination name
        const label = isDestinationId
          ? destinationName || `Loading...`
          : decodeURIComponent(value).replace(/-|_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return isLast ? (
          <span key={to}> / {label}</span>
        ) : (
          <span key={to}>
            {' '}
            / <Link to={to}>{label}</Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
