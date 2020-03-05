
export abstract class UseCase<Input, Output> {
    abstract buildUseCase(input?: Input, isGetEntity?: boolean): Promise<Output>;
    public execute(input?: Input, isGetEntity: boolean = true): Promise<Output> {
        try {
            return this.buildUseCase(input, isGetEntity);
        } catch (ex) {
            console.error(ex);
            throw (ex);
        }
    }
}
