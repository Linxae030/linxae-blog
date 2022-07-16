import request_form from '@/config/axios/config';

export function login(account: string, password: string) {
    return request_form.post('/api/login', { username: account, password: password },)
}

export function logout(account: string) {
    return request_form.post('/api/logout', { username: account },)
}