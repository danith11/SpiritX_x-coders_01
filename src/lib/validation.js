export const validateUsername = (username) => {
    if (!username || username.length < 8) return 'Username must be at least 8 characters';
    return '';
}

export const validatePassword = (password) => {
    if (!password || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[!@#$%]/.test(password))
        return 'Password must contain lowercase, uppercase, and special character';
    return '';
}

export const validateConfirmPassword = (password, confirm) => {
    if (password !== confirm) return 'Passwords do not match';
    return '';
}