
// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { 
//   User,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile
// } from 'firebase/auth';
// import { auth } from '@/lib/firebase';

// interface AuthContextType {
//   currentUser: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (email: string, password: string, displayName?: string) => Promise<void>;
//   logout: () => Promise<void>;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Mock authentication for development since Firebase isn't configured
//   const signup = async (email: string, password: string, displayName?: string) => {
//     try {
//       // For development, we'll create a mock user
//       const mockUser = {
//         uid: Date.now().toString(),
//         email,
//         displayName: displayName || email.split('@')[0],
//         emailVerified: true,
//         isAnonymous: false,
//         metadata: {
//           creationTime: new Date().toISOString(),
//           lastSignInTime: new Date().toISOString()
//         },
//         providerData: [],
//         refreshToken: 'mock-refresh-token',
//         tenantId: null,
//         delete: async () => {},
//         getIdToken: async () => 'mock-id-token',
//         getIdTokenResult: async () => ({} as any),
//         reload: async () => {},
//         toJSON: () => ({})
//       } as User;

//       setCurrentUser(mockUser);
      
//       // Store user in localStorage for persistence
//       localStorage.setItem('mockUser', JSON.stringify({
//         uid: mockUser.uid,
//         email: mockUser.email,
//         displayName: mockUser.displayName
//       }));
//     } catch (error) {
//       console.error('Signup error:', error);
//       throw new Error('Failed to create account. Please try again.');
//     }
//   };

//   const login = async (email: string, password: string) => {
//     try {
//       // For development, check if user exists in localStorage or create new one
//       const storedUser = localStorage.getItem('mockUser');
//       let mockUser;

//       if (storedUser) {
//         const userData = JSON.parse(storedUser);
//         mockUser = {
//           uid: userData.uid,
//           email: userData.email,
//           displayName: userData.displayName,
//           emailVerified: true,
//           isAnonymous: false,
//           metadata: {
//             creationTime: new Date().toISOString(),
//             lastSignInTime: new Date().toISOString()
//           },
//           providerData: [],
//           refreshToken: 'mock-refresh-token',
//           tenantId: null,
//           delete: async () => {},
//           getIdToken: async () => 'mock-id-token',
//           getIdTokenResult: async () => ({} as any),
//           reload: async () => {},
//           toJSON: () => ({})
//         } as User;
//       } else {
//         // Create new mock user if none exists
//         mockUser = {
//           uid: Date.now().toString(),
//           email,
//           displayName: email.split('@')[0],
//           emailVerified: true,
//           isAnonymous: false,
//           metadata: {
//             creationTime: new Date().toISOString(),
//             lastSignInTime: new Date().toISOString()
//           },
//           providerData: [],
//           refreshToken: 'mock-refresh-token',
//           tenantId: null,
//           delete: async () => {},
//           getIdToken: async () => 'mock-id-token',
//           getIdTokenResult: async () => ({} as any),
//           reload: async () => {},
//           toJSON: () => ({})
//         } as User;

//         localStorage.setItem('mockUser', JSON.stringify({
//           uid: mockUser.uid,
//           email: mockUser.email,
//           displayName: mockUser.displayName
//         }));
//       }

//       setCurrentUser(mockUser);
//     } catch (error) {
//       console.error('Login error:', error);
//       throw new Error('Failed to sign in. Please check your credentials.');
//     }
//   };

//   const logout = async () => {
//     try {
//       localStorage.removeItem('mockUser');
//       setCurrentUser(null);
//     } catch (error) {
//       console.error('Logout error:', error);
//       throw new Error('Failed to sign out.');
//     }
//   };

//   useEffect(() => {
//     // Check for stored user on app load
//     const storedUser = localStorage.getItem('mockUser');
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       const mockUser = {
//         uid: userData.uid,
//         email: userData.email,
//         displayName: userData.displayName,
//         emailVerified: true,
//         isAnonymous: false,
//         metadata: {
//           creationTime: new Date().toISOString(),
//           lastSignInTime: new Date().toISOString()
//         },
//         providerData: [],
//         refreshToken: 'mock-refresh-token',
//         tenantId: null,
//         delete: async () => {},
//         getIdToken: async () => 'mock-id-token',
//         getIdTokenResult: async () => ({} as any),
//         reload: async () => {},
//         toJSON: () => ({})
//       } as User;
      
//       setCurrentUser(mockUser);
//     }
//     setLoading(false);
//   }, []);

//   const value: AuthContextType = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }




// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { 
//   User,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged
// } from 'firebase/auth';
// import { auth } from '@/lib/firebase';

// interface AuthContextType {
//   currentUser: User | null;
//   loading: boolean;
//   signup: (email: string, password: string) => Promise<void>;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   async function signup(email: string, password: string) {
//     await createUserWithEmailAndPassword(auth, email, password);
//   }

//   async function login(email: string, password: string) {
//     await signInWithEmailAndPassword(auth, email, password);
//   }

//   async function logout() {
//     await signOut(auth);
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     loading,
//     signup,
//     login,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }





import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup implementation
    const newUser: User = {
      id: Date.now().toString(),
      uid: Date.now().toString(),
      email,
      name,
      createdAt: new Date()
    };
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const login = async (email: string, password: string) => {
    // Mock login implementation
    const user: User = {
      id: Date.now().toString(),
      uid: Date.now().toString(),
      email,
      name: email.split('@')[0], // Use email prefix as name
      createdAt: new Date()
    };
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};