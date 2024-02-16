export const menuItemsData = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Categories",
    url: "",
    submenu: [
      {
        title: "Web Design",
        url: "web-design",
      },
      {
        title: "Web Development",
        url: "web-dev",
        submenu: [
          {
            title: "Frontend",
            url: "frontend",
          },
          {
            title: "Backend",
            submenu: [
              {
                title: "NodeJS",
                url: "node",
              },
              {
                title: "PHP",
                url: "php",
              },
            ],
          },
        ],
      },
      {
        title: "SEO",
        url: "seo",
      },
    ],
  },
];
