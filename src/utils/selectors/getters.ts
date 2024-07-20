import { useStore } from "../../store/main";

//User
export const GetUserData = () => {
    return useStore((state) => state.user);
};

export const GetRawAddress = () => {
    return useStore((state) => state.user.rawAddress);
};

export const GetFriendlyAddress = () => {
    return useStore((state) => state.user.userFriendlyAddress);
};
