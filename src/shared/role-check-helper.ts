import { TRole } from './constant';

export const validRole = (role: TRole): boolean => {
  const roles: TRole[] = ['admin', 'company', 'user'];
  return roles.includes(role);
};

