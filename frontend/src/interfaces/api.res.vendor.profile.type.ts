export interface IVendorProfileData {
  address: string;
  createdAt: string;
  description: string;
  email: string;
  id: string;
  isBlackListed: boolean;
  logo: string | null;
  name: string;
  phone: string;
  updatedAt: string;
  follower: IVendorFollowers[];
}

export interface IVendorFollowers {
  userId: string;
  vendorId: string;
  user: IUser;
}

export interface IUser {
  profile: IProfile;
}

export interface IProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  img: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
