import { Joke } from "./joke";

export interface ServerResponse {
    total: number;
    result: Joke[];
}