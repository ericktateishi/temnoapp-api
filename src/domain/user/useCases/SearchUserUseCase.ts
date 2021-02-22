import { inject, injectable } from 'tsyringe';
import IUseCase, { ListAllRequest } from '@domain/core/IUseCase';
import IUserData, { ListUserResponse } from '@domain/user/data/IUserData';

export interface ISearchListUserRequest extends ListAllRequest {
  email?: string;
}

@injectable()
export default class SearchUserUseCase
  implements IUseCase<ISearchListUserRequest, ListUserResponse> {
  constructor(
    @inject('UserData')
    private userData: IUserData,
  ) {}

  public async execute({
    limit,
    offset,
    email,
  }: ISearchListUserRequest): Promise<ListUserResponse> {
    return this.userData.search(limit, offset, email);
  }
}
