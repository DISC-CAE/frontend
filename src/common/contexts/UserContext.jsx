import React from 'react';

import PropTypes from 'prop-types';

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
  isLoading: false,
});

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function UserProvider({ children }) {
  const contextValue = {
    user: null,
    setUser: () => {},
    isLoading: false,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
