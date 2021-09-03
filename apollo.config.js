module.exports = {
  client: {
    service: {
      name: "8base",
      url: process.env.REACT_APP_APOLLO_CLIENT,
    },
    includes: ["src/*.{ts,tsx,js,jsx}"],
  },
};
