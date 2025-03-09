export const ageValidation = (birthday: string): boolean => {
     // checking if Mecha is 18 olds or more
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
  
   // Maybe it is their birthday today
    const hasBirthdayOccurred =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
    return hasBirthdayOccurred ? age >= 18 : age - 1 >= 18;
  };
  