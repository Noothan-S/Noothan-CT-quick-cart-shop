interface INavItems {
  name: string;
  link: string;
}

const navItems: INavItems[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Categories",
    link: "/categories",
  },
  {
    name: "Vendors",
    link: "/vendors",
  },
  {
    name: "About",
    link: "/about",
  },
];

export default navItems;
