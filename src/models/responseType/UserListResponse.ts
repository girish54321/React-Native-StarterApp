export interface Geo {
    lat: string;
    lng: string;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface UserList {
    id: number;
    first_name: string;
    avatar: string;
    last_name: string,
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface UserListResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserList[];
    support: Support;
}

export interface Support {
    url: string;
    text: string;
}
