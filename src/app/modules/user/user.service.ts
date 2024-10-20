/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './user.model';

const getProfilefromDB = async (userInfo: any) => {
  const { _id } = userInfo;
  const result = await User.findById(_id).select('-password');
  return result;
}


const updateProfilefromDB = async (userInfo: any, payload: any) => {
  const { _id } = userInfo;

  const updateFields = {
    name: payload?.name,
    phone: payload?.phone,
  };

  const result = await User.findByIdAndUpdate(_id, updateFields, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!result) {
    throw new Error('User not found');
  }

  return result;
};




export const UserServices = {
  // createUserIntoDB,
  getProfilefromDB,
  updateProfilefromDB
};
