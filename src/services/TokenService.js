const UNIQUE_DEVICE_ID = 'uid'
const TOKEN = 'Authorization'
const REFRESH_TOKEN = 'Refresh'
const EXPIRE_TIME = 'Expire'
const PHONE_NUMBER = 'Phone'

export const deviceId = {
    save (value) {
        localStorage.setItem(UNIQUE_DEVICE_ID, value)
    },
    get () {
        return localStorage.getItem(UNIQUE_DEVICE_ID)
    },
    remove () {
        localStorage.removeItem(UNIQUE_DEVICE_ID)
    },
}

export const token = {
    save (value) {
        localStorage.setItem(TOKEN, value)
    },
    get () {
        return localStorage.getItem(TOKEN)
    },
    remove () {
        localStorage.removeItem(TOKEN)
    },
}

export const refreshToken = {
    save (value) {
        localStorage.setItem(REFRESH_TOKEN, value)
    },
    get () {
        return localStorage.getItem(REFRESH_TOKEN)
    },
    remove () {
        localStorage.removeItem(REFRESH_TOKEN)
    },
}

export const expireTime = {
    save (value) {
        localStorage.setItem(EXPIRE_TIME, value)
    },
    get () {
        return Number(localStorage.getItem(EXPIRE_TIME))
    },
    remove () {
        localStorage.removeItem(EXPIRE_TIME)
    },
}

export const phoneNumber = {
    save (value) {
        localStorage.setItem(PHONE_NUMBER, value)
    },
    get () {
        return localStorage.getItem(PHONE_NUMBER)
    },
    remove () {
        localStorage.removeItem(PHONE_NUMBER)
    },
}

export function removeAllTokens () {
    token.remove()
    refreshToken.remove()
    expireTime.remove()
}

export default {
    deviceId,
    token,
    refreshToken,
    expireTime,
    phoneNumber,
    removeAllTokens,
}
