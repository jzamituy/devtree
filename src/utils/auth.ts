import bcrypt from 'bcrypt';

export async function hashPassword(plainPassword) {
    const saltRounds = 15; 
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  }

  export async function validatePassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  }
  