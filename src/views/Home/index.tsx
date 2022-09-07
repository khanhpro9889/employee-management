import { HOME_PATH } from "../../constants/path";
import lazyLoading from "../../utils/router/lazyLoading";

const page = {
  path: HOME_PATH,
  page: lazyLoading(() => import("./Home")),
};

export default page;
