export interface Community {
  id: number;
  name: string;
  description?: string;
  members: CommunityMembersInfo;
  createdAt?: string;
  updatedAt?: string;
}

type CommunityMembersInfo = {
  total: number;
  featured: CommunityMember[];
};

type CommunityMember = {
  userId: number;
  roleId: number;
  communityId: number;
  joinedAt: Date;
  user: User;
};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  identificationNumber?: string;
  phone?: string;
  profilePic?: string;
}

export interface LoginResponse {
  access_token: string | null;
  user: User | null;
}

export interface JoinedCommunities {
  communityId: number;
  roleId: number;
  joinedAt: Date;
}
