import { useState } from 'react';

// Inline styles
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  // gap: '4px',
};

const textStyle = {
  lineHeight: 1,
  margin: 0,
};

const starStyle = {
  display: 'block',
  width: '40px',
  height: '30px',
  cursor: 'pointer',
  padding: '0 3px',
};

// Svg stars
const fullStar = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000" stroke="#000">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const emptyStar = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#000">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="{2}"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

function Star({ onRate, isFull, onHoverIn, onHoverOut }) {
  return (
    <span
      style={starStyle}
      role="button"
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {isFull ? fullStar : emptyStar}
    </span>
  );
}

function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRate(newRating) {
    setRating(newRating);
  }

  // Ensure maxRating is a positive integer
  const validMaxRating = Number.isInteger(maxRating) && maxRating > 0 ? maxRating : 5;

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: validMaxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRate(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            isFull={tempRating ? tempRating > i : rating > i}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ''}</p>
    </div>
  );
}

export default StarRating;
