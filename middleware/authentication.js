import { validateToken } from "../services/authentication.js";

export function CheckforCookies(cookie) {
    return async (req, res, next) => {
        const token = req.cookies[cookie];
        if (!token) {
            return next();
        }
        try {
            const userPayload = await validateToken(token);
            req.user = userPayload;
        } catch (error) {
            console.error('Token validation error:', error);
        }
       return  next();
    };
}