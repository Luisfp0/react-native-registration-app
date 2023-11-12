import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextProps {
  children: ReactNode;
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface UserContextValue {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = (userData: UserData) => {
    setUser(userData);
  };

  const logout = () => {
    // Lógica de logout
    setUser(null);
  };

  const value: UserContextValue = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};
