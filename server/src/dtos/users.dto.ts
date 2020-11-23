
export class CreateUserDto {
  readonly full_name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly phone_no: string;
  readonly user_type: string;
  readonly parent_user_id:string;
  readonly status: boolean;
  readonly updated_at: string;
  readonly created_at: string;
  readonly role_id: string;
}

export class LoginInDto{
  readonly email?: string;
  readonly username?: string;
  readonly password: string;
}
