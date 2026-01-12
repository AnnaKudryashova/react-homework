import {
    createContext,
    useEffect,
    useState,
    useContext,
    ReactNode,
} from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const logout = (): Promise<void> => signOut(auth);

    const value: AuthContextType = { user, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
