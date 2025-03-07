export const checkAuthorization = (user:UserProps) => {
    if(user.Roles.includes("Mechanist"))
    return true
    else
    return false;
}