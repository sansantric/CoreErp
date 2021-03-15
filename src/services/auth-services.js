import request from '../utils/fetch'

export const Login = (body) => request.post('/SYSMAN/login',body)

export const GetClientKey = (body) => request.post('/SYSMAN/client',body)

export const CompanyList = (body) => request.post('/SYSMAN/structure', body)

export const GetMenu = (body) => request.post('/SYSMAN/structure', body)