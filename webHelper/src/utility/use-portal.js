import React from 'react';

function usePortal(id) {
  const rootElemRef = React.useRef(document.createElement('div'));

  React.useEffect(() => {
    // Look for existing target dom element to append to
    const parentElem = document.querySelector(`#${id}`);
    // Add the detached element to the parent

    parentElem.appendChild(rootElemRef.current);

    // This function is run on unmount
    return () => rootElemRef.current.remove();
  },
  [id]);

  return rootElemRef.current;
}

export default usePortal;
