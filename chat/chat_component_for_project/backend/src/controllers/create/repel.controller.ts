import { CustomRequest } from "../auth/user.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const createrepel = asyncHandler(async (req: CustomRequest, res) => {
  try {
    res.status(200).json({
      message: "new repel created",
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: "Some error while creating repel",
    });
  }
});

export { createrepel };
