export interface City {
    user_id: number;
    city_id: number;
    username: string;
    price: number | null;
}

export interface UseMap {
    cityList: City[];
    isLoading: boolean;
    error: string | null;
    fetchCityList: () => Promise<void>;
    setLoading: (isTrue: boolean) => void;
}
