export default class CustomError extends Error {
    constructor(message: string, public status: number, public details?: unknown) {
        super(message);
        this.status = status;
        this.details = details;
    }
}