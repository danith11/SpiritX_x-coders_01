const PasswordStrength = ({ password }) => {
    const strength = password.length >= 8 && /[A-Z]/.test(password) && /[!@#$%]/.test(password) ? 'Strong' : 'Weak';
    return <p className={`text-sm ${strength === 'Strong' ? 'text-green-500' : 'text-red-500'}`}>{strength}</p>;
}

export default PasswordStrength;