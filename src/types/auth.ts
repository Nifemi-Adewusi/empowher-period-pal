
export type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  lastPeriod?: Date;
  cycleLength?: number;
  periodLength?: number;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  googleAuth: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
};
