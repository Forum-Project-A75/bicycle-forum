export const validateLoginData = (email, password) => {
    if (!email || !password) {
      alert('Please enter an email and password');
      return false;
    }

    return true;
}