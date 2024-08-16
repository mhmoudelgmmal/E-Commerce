export interface LoginDataResponse {
    auth : LoginData
}
export interface LoginData {
    id:           number;
    username:     string;
    email:        string;
    firstName:    string;
    lastName:     string;
    gender:       string;
    image:        string;
    token:        string;
    refreshToken: string;
}
