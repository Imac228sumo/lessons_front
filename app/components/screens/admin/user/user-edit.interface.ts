import { IUser } from '@/shared/types/user.interface'

export interface IUserEditInput extends Omit<IUser, '_id' | 'createdAt'> {}
