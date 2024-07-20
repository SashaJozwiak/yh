import { useStore } from "../../store/main";

//User
export const SetUserData = () => {
    return useStore((state) => state.setUser);
};

export const SetUserAddresses = () => {
    return useStore((state) => state.addAddresses);
};
