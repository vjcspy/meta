import React from 'react';

const SearchField: React.FC<{
  onChange: () => void;
  handleFocus: () => void;
}> = (props) => {
  const { handleFocus, onChange } = props;
  return (
    <>
      <input
        name="search-bar-query-search"
        onChange={onChange}
        onFocus={handleFocus}
      />
    </>
  );
};

export default SearchField;
