const RouteURL = {
  sign_in: `${process.env.REACT_APP_PORT}/dst/v1/signin`,
  sign_up: `${process.env.REACT_APP_PORT}/dst/v1/signup`,
  forget: `${process.env.REACT_APP_PORT}/dst/v1/forget-password`,
  matchOtp: `${process.env.REACT_APP_PORT}/dst/v1/matchOTP`,
  updatePass: `${process.env.REACT_APP_PORT}/dst/v1/updatepassword`,
  createTodo: `${process.env.REACT_APP_PORT}/dst/v1/todo/create`,
  getAllTodo: `${process.env.REACT_APP_PORT}/dst/v1/todo/getAll`,
  getProfile : `${process.env.REACT_APP_PORT}/dst/v1/todo/profile`
};

const Redirects = {
  todo: "/todo",
  home: "/dst",
  signin: "/sign-in",
  signup: "/sign-up",
  forget: "/forget-password",
  updatePass: "/update-password",
  profile: "/profile",
};

export { RouteURL, Redirects };
