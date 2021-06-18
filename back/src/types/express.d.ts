type SigoUser = import("../entities/User").default;
declare namespace Express {
  interface SessionData { }
  interface User extends SigoUser { }
}
