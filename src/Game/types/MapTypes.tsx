export interface City {
    user_id: number;
    city_id: number;
    username: string;
    price: number | null;
    color: string;
}

export interface UseMap {
    cityList: City[];
    isLoading: boolean;
    error: string | null;
    fetchCityList: () => Promise<void>;
    setLoading: (isTrue: boolean) => void;
    changeMyColor: (city_id: number, color: string) => Promise<void>;
}
