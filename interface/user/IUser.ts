interface UserProps{
    Id: string;
    Active: boolean;
    Avatar: string;
    Address: string;
    IsVerified: boolean;
    Fullname: string;
    Gender: "Male" | "Female" | "Others";
    Birthday: string;
    UserName: string;
    Email: string;
    Balance: number;
    Roles: string[] | "guest";
  };

  interface UserRequestProps{
    Fullname: string,
    Gender: "Male" | "Female" | "Others"
    Birthday:string
    Address: string,
    UserName: string,
    Password: string,
    Email: string,
  }