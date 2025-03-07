interface UserProps{
    Id: string;
    Active: boolean;
    Avatar: string;
    Address: string;
    IsVerified: boolean;
    Fullname: string;
    Gender: "Male" | "Female" | "Others";
    Birthday: Date;
    UserName: string;
    Email: string;
    Balance: number;
    Roles: string[] | "guest";
  };