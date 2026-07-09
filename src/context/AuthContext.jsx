import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load current user session from local storage on mount
    const savedUser = localStorage.getItem('mb_current_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse active session user', e);
        localStorage.removeItem('mb_current_user');
      }
    }
    setLoading(false);
  }, []);

  const signUp = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('mb_users') || '[]');
    
    // Check if user already exists
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password, // Simple local-storage plain password for frontend mockup
      favorites: []
    };

    users.push(newUser);
    localStorage.setItem('mb_users', JSON.stringify(users));
    
    // Auto-login after sign up
    setCurrentUser(newUser);
    localStorage.setItem('mb_current_user', JSON.stringify(newUser));
    return { success: true };
  };

  const signIn = (email, password) => {
    const users = JSON.parse(localStorage.getItem('mb_users') || '[]');
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, message: 'Invalid email or password.' };
    }

    setCurrentUser(user);
    localStorage.setItem('mb_current_user', JSON.stringify(user));
    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('mb_current_user');
  };

  const toggleFavorite = (movieId) => {
    if (!currentUser) return false;

    const users = JSON.parse(localStorage.getItem('mb_users') || '[]');
    const updatedUser = { ...currentUser };
    
    const index = updatedUser.favorites.indexOf(movieId);
    if (index > -1) {
      updatedUser.favorites.splice(index, 1);
    } else {
      updatedUser.favorites.push(movieId);
    }

    // Update state
    setCurrentUser(updatedUser);
    localStorage.setItem('mb_current_user', JSON.stringify(updatedUser));

    // Update in users registry
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    localStorage.setItem('mb_users', JSON.stringify(updatedUsers));
    
    return true;
  };

  const isFavorite = (movieId) => {
    if (!currentUser || !currentUser.favorites) return false;
    return currentUser.favorites.includes(movieId);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, signUp, signIn, signOut, toggleFavorite, isFavorite }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
