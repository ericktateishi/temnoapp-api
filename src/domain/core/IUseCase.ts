export default interface IUseCase<DTO, Response> {
  execute(requestDTO?: DTO): Promise<Response>;
}

export type ListAllRequest = {
  limit: number;
  offset: number;
};
