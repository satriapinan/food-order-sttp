export const validateRegisterForm = ({
  username,
  email,
  fullName,
  password,
  confirmPassword,
  existingUsers = [],
}) => {
  const trimmedUsername = username?.trim();
  const trimmedEmail = email?.trim();
  const trimmedFullName = fullName?.trim();

  if (!trimmedUsername) {
    return { valid: false, message: 'Username wajib diisi.' };
  }

  if (!trimmedEmail) {
    return { valid: false, message: 'Email wajib diisi.' };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    return { valid: false, message: 'Format email tidak valid.' };
  }

  if (!trimmedFullName) {
    return { valid: false, message: 'Nama lengkap wajib diisi.' };
  }

  if (!password || password.length < 6) {
    return { valid: false, message: 'Password minimal 6 karakter.' };
  }

  if (password !== confirmPassword) {
    return { valid: false, message: 'Password dan konfirmasi password tidak cocok.' };
  }

  const emailExists = existingUsers.some(
    (user) => user.email?.toLowerCase() === trimmedEmail.toLowerCase()
  );

  if (emailExists) {
    return { valid: false, message: 'Email sudah terdaftar. Silakan gunakan email lain.' };
  }

  return { valid: true, message: '' };
};
