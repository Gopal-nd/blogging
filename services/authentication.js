import jwt from "jsonwebtoken"

const secret  = "123";

export async function createTokenForUser(user){
    const payload = {
        _id:user._id,
        email:user.email,
        profileImageURL:user.profileImage,
        role:user.role,
    }
const token = jwt.sign(payload,secret)
return token
} 


export async function  validateToken(token) {
    const payload = jwt.verify(token,secret)
    return payload
}