export interface UserProfile {
  id: number;
  username: string;
  email: string;
  avatar?: string | null;
  isAdmin?: boolean;
}

export interface ProfileContextType {
  profile: UserProfile | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
}