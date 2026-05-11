export type ConnectedIdentity = {
  provider: string;
  email: string | null;
};

export type Profile = {
  id: string;
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  identities: ConnectedIdentity[];
};
