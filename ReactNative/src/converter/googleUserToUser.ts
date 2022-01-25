import { User } from '../entities';

export const googleUserToUser = (data: GoogleUser) => {
  const user = new User();
  user.fullName = data.displayName;
  user.email = data.email;
  user.photoUrl = data.photoURL;
  user.uid = data.uid;
  return user;
};

type GoogleUser = {
  displayName: string;
  uid: string;
  email?: string;
  photoURL?: string;
};
