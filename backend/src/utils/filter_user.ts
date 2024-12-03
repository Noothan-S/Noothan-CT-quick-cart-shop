import { User } from "@prisma/client";

function filteredUser(user: User) {
    const result = Object.fromEntries(
        Object.entries(user).filter(([key, value]) => value !== null && key !== 'password')
    );

    return result
};

export default filteredUser;