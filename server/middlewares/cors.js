import cors from "cors";
const ACCEPTED_ORIGINS = ["http://localhost:5173/"];

export const corsMiddlewares = () => {
  return cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allow"));
    },
    credentials: true,
  });
};
