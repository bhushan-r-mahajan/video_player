import { asyncHandlerUsingPromises } from "../utils/asyncHandler.js";

const registerUser = asyncHandlerUsingPromises(async (req, res) => {
  res.status(200).json({
    message: "Ok",
  });
});

export { registerUser };
