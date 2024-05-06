import request from "../request";

interface ILoginRequest {
    email: string;
    password: string;
    phoneNumber?: string;
}

const login = async ({ email, password }: ILoginRequest ) => {
    const response = request({
        key: ENDPOINT.LOGIN,
        method: 'POST',
        url: ENDPOINT.LOGIN,
        params: {
            email,
            password,
        }
    });

    return response;
}

export default login;