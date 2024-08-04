import { asyncHandlerUsingPromises } from "../utils/asyncHandler.js";
import ApiErrorHandler from "../utils/apiErrorHandler.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponseHandler from "../utils/apiResponseHandler.js";

const registerUser = asyncHandlerUsingPromises(async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  if (
    [userName, fullName, email, password].some((field) => field?.trim() === "")
  ) {
    return res
      .status(400)
      .json(new ApiErrorHandler(400, "All fields are required."));
  }
  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
  if (existingUser) {
    return res
      .status(409)
      .json(
        new ApiErrorHandler(409, "User with email or username already exists.")
      );
  }
  if (!req.files.avatar) {
    return res
      .status(500)
      .json(
        new ApiErrorHandler(409, "Error uploading profile picture images.")
      );
  }
  const avatarLocalPath = req.files.avatar[0].path;
  if (!avatarLocalPath) {
    return res
      .status(400)
      .json(new ApiErrorHandler(400, "Profile picture is required."));
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    return res
      .status(400)
      .json(new ApiErrorHandler(400, "Profile picture is required."));
  }
  let coverImage = "";
  if (req.files.coverImage) {
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    const coverImageResponse = await uploadOnCloudinary(coverImageLocalPath);
    coverImage = coverImageResponse.url;
  }
  const user = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    email,
    avatar: avatar.secure_url,
    coverImage,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    return res
      .status(400)
      .json(
        new ApiErrorHandler(500, "Something went wrong while creating user.")
      );
  }
  return res
    .status(201)
    .json(
      new ApiResponseHandler(200, createdUser, "User registerd successfully.")
    );
});

export { registerUser };
