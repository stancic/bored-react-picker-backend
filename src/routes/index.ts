import * as express from "express";
import favoriteMovieRouter from "./FavoriteMovieRouter";
import userRouter from "./UserRouter";
import watchedMovieRouter from "./WatchedMovieRouter";
import ratedMovieRouter from "./RatedMovieRouter";

const router = express.Router();

router.use("/users", userRouter);
router.use("/favorite-movies", favoriteMovieRouter);
router.use("/watched-movies", watchedMovieRouter);
router.use("/rated-movies", ratedMovieRouter);

export default router;
