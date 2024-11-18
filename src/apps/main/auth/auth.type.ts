export type SigninPayloadType = {
  username: string;
  password: string;
};

export type TokenPayloadType = {
  tp: 0 | 1;
  uid: number;
  ip: string;
  usa: string;
};
