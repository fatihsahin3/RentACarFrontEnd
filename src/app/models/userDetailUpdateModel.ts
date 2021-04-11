export interface UserDetailUpdateModel {
  id: number;
  customerId: number;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}
