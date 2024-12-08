const fetchAllUsersIncludeObj = {
  profile: true,
};

const fetchMeIncludeObj = {
  follower: {
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  },
  product: {
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  },
};

const fetchMeProfileIncludeObj = {
  user: {
    select: {
      following: {
        include: {
          vendor: true,
        },
      },
      order: {
        include: {
          items: {
            select: {
              product: {
                include: {
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const UserConstants = {
  fetchAllUsersIncludeObj,
  fetchMeIncludeObj,
  fetchMeProfileIncludeObj,
};
