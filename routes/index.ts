import * as express from "express";
import favoriteMovieRouter from "./FavoriteMovieRouter";
import userRouter from "./UserRouter";
import watchedMovieRouter from "./WatchedMovieRouter";
import ratedMovieRouter from "./RatedMovieRouter";

const router = express.Router();

router.use(userRouter);
router.use("/favoriteMovies", favoriteMovieRouter);
router.use("/watchedMovies", watchedMovieRouter);
router.use("/ratedMovies", ratedMovieRouter);

export default router;
