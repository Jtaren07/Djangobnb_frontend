'use client';

import useAddPropertyModel from "@/app/hooks/useAddPropertyModel"
import useLoginModel from "@/app/hooks/useLoginModel";


interface AddPropertyButtonProps {
  userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
  userId

  }) => {
    const LoginModel = useLoginModel();
    const addPropertyModel = useAddPropertyModel();

  const airbnbYourHome = () => {
    if (userId) {
      addPropertyModel.open();
    } else {
      LoginModel.open();
    }
  }

  return (
    <div onClick={airbnbYourHome} className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200">
        Django your home
    </div>
  )
}
export default AddPropertyButton