import { useState } from 'react';
import { PropTypes } from 'prop-types';

TextExpander.propTypes = {
  expanded: PropTypes.bool,
  collapsedNumWords: PropTypes.number,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const textShortener = (text, wordsNum) => {
  const textArr = text.split(' ');

  if (textArr.length <= wordsNum) {
    return text;
  }
  return textArr.slice(0, wordsNum).join(' ') + '...';
};

function ExpanderButton({ children, buttonColor, onClick }) {
  const expanderBtnStyle = {
    color: buttonColor,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    margin: 0,
    padding: 0,
  };
  return (
    <button style={expanderBtnStyle} onClick={onClick}>
      {children}
    </button>
  );
}

function TextExpander({
  expanded = true,
  collapsedNumWords = 10,
  expandButtonText = 'Show more',
  collapseButtonText = 'Show less',
  buttonColor = '#fcc419',
  className = '',
  children,
}) {
  const [isExpanded, setExpanded] = useState(expanded);

  const isString = typeof children === 'string';

  const content = isString && !isExpanded ? textShortener(children, collapsedNumWords) : children;

  return (
    <div className={className}>
      <span>{content}</span>{' '}
      <ExpanderButton buttonColor={buttonColor} onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </ExpanderButton>
    </div>
  );
}

export default TextExpander;
