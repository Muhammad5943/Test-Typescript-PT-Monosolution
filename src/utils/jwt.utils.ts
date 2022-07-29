import jwt from "jsonwebtoken"
import config from "config"

export const signJwt = (
    object: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options?: jwt.SignOptions | undefined
) => {
    const signingKey = Buffer.from(
        config.get<string>(keyName),
        "base64"
    ).toString("ascii")

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: "RS256",
    })
}

export const verifyJwt = (
    token: string,
    keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) => {
    const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
        "ascii"
    )

    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (error: any) {
        console.error(error)
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        }
    }
}