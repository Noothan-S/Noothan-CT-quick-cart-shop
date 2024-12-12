import { Profile, UserRole, UserStatus, Vendor } from "@prisma/client";
import { bcryptOperation } from "../../../utils/bcrypt";
import buildPrismaQuery from "../../../utils/build_prisma_query";
import prisma from "../../constants/prisma_constructor";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IServiceReturn } from "../../interfaces/service_return_type";
import { UserConstants } from "./users.constant";
import { ICreateUser } from "./users.interface";
import { JwtPayload } from "jsonwebtoken";

async function blockUnblockUserIntoDb(payload: {
  email: string;
}): Promise<IServiceReturn> {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    return {
      status: 404,
      success: false,
      message: "user not found with that email",
      data: null,
    };
  }

  const actionPayloadForUser = {
    status:
      user.status === UserStatus.ACTIVE
        ? UserStatus.BLOCKED
        : UserStatus.ACTIVE,
  };

  const result = await prisma.$transaction(async (tx) => {
    const blockOrUnblockUser = await prisma.user.update({
      where: {
        email: payload.email,
      },
      data: actionPayloadForUser,
    });

    if (user.role === UserRole.VENDOR) {
      const actionPayloadForVendor: Partial<Vendor> = {
        isBlackListed: user.status === UserStatus.ACTIVE,
      };

      await prisma.vendor.update({
        where: {
          email: payload.email,
        },
        data: actionPayloadForVendor,
      });
    }

    if (user.role === UserRole.CUSTOMER) {
      const actionPayloadForCustomer: Partial<Profile> = {
        isDeleted: user.status === UserStatus.ACTIVE,
      };

      await prisma.profile.update({
        where: {
          email: payload.email,
        },
        data: actionPayloadForCustomer,
      });
    }

    return blockOrUnblockUser;
  });

  return {
    status: 200,
    success: true,
    message: `User ${
      user.status === "ACTIVE" ? "Blocked" : "unblocked"
    } successfully`,
    data: result,
  };
}

async function getMyProfileFromDb(user: JwtPayload, options: any) {
  let result;

  switch (user.role) {
    case UserRole.VENDOR:
      result = await prisma.vendor.findUnique({
        where: {
          email: user.email,
          isBlackListed: false,
        },
        include:
          options?.include === "yes"
            ? UserConstants.fetchMeIncludeObj
            : undefined,
      });
      break;

    default:
      result = await prisma.profile.findUnique({
        where: {
          email: user.email,
          isDeleted: false,
        },
        include:
          options?.include === "yes"
            ? UserConstants.fetchMeProfileIncludeObj
            : undefined,
      });
      break;
  }

  if (!user) {
    return {
      status: 423,
      success: false,
      message: "Locked: User deleted or blocked by admin",
      data: null,
    };
  }

  return {
    status: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  };
}

async function getAllUsersFromDb(
  options: IPaginationOptions,
  filters: any
): Promise<IServiceReturn> {
  const result = await buildPrismaQuery({
    model: "user",
    pagination: options,
    filters: {
      ...filters,
      role: UserRole.CUSTOMER,
      isDeleted: false,
      status: "ACTIVE",
    },
    include: UserConstants.fetchAllUsersIncludeObj,
  });

  return {
    status: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  };
}
async function getAllVendorsFromDb(
  options: IPaginationOptions,
  filters: any
): Promise<IServiceReturn> {
  const _filters: Filters = {};

  type Filters = {
    isBlackListed?: boolean;
  };

  if (filters.isBlackListed === "true") {
    _filters.isBlackListed = true;
  } else if (filters.isBlackListed === "false") {
    _filters.isBlackListed = false;
  }

  const result = await buildPrismaQuery({
    model: "vendor",
    pagination: options,
    filters: _filters,
  });

  return {
    status: 200,
    success: true,
    message: "Vendors retrieved successfully",
    data: result,
  };
}

async function createUserIntoDb(payload: ICreateUser): Promise<IServiceReturn> {
  const { password, ...othersData } = payload;
  const hashedPassword = await bcryptOperation.hashPassword(password);

  const isExist = await prisma.user.findUnique({
    where: {
      email: othersData.email,
    },
  });

  if (isExist) {
    return {
      status: 400,
      success: false,
      message: "Email already registered",
      data: null,
    };
  }

  const result = await prisma.user.create({
    data: {
      ...othersData,
      password: hashedPassword,
    },
  });

  const { password: _password, ...userWithoutPassword } = result;

  return {
    status: 201,
    success: true,
    message: "User created Successfully",
    data: userWithoutPassword,
  };
}

async function updateProfileIntoDb(payload: any): Promise<IServiceReturn> {
  const { email, ...othersData } = payload;
  let result;

  const user = await prisma.user.findUnique({
    where: {
      email,
      isDeleted: false,
    },
  });

  if (!user) {
    return {
      status: 404,
      success: false,
      message: "Account not found with that id",
      data: null,
    };
  }

  if (user.role === "VENDOR") {
    result = await prisma.vendor.upsert({
      where: { email },
      update: { ...othersData },
      create: { email, ...othersData },
    });
  } else {
    result = await prisma.profile.upsert({
      where: { email },
      update: { ...othersData },
      create: { email, ...othersData },
    });
  }

  const { password, ...userWithoutPassword } = user;

  return {
    status: 200,
    success: true,
    message: `${
      user.role === "VENDOR" ? "Vendor" : "Profile"
    } updated successfully`,
    data: {
      user: { ...userWithoutPassword },
      [user.role.toLocaleLowerCase()]: { ...result },
    },
  };
}

export const UserServices = {
  createUserIntoDb,
  updateProfileIntoDb,
  getAllUsersFromDb,
  getAllVendorsFromDb,
  getMyProfileFromDb,
  blockUnblockUserIntoDb,
};
