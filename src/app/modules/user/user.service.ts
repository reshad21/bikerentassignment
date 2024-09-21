/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './user.model';

const getProfilefromDB = async (payload: any) => {
  const result = await User.findOne(
    {
      email: payload.email,
      phone: payload.phone
    }
  ).select('-password');
  return result;
}


const updateProfilefromDB = async (id: string, payload: any) => {
  const updateFields = {
    name: payload?.name,
    phone: payload?.phone,
  };

  const result = await User.findByIdAndUpdate(id, updateFields, {
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
