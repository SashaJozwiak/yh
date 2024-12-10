export interface City {
    user_id: number;
    city_id: number;
    username: string;
    price: number | null;
    color: string;
    channel;
}

export interface UseMap {
    cityList: City[];
    isLoading: boolean;
    error: string | null;
    selectedLocation: City | null;
    setSelectedLocation(city: City): void;
    fetchCityList: () => Promise<void>;
    setLoading: (isTrue: boolean) => void;
    changeMyColor: (city_id: number, color: string) => Promise<void>;
    updateChannel: (city_id: number, channel: string) => Promise<void>;
}
