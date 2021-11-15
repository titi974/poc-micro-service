import {Injectable} from '@nestjs/common';
import {Cart} from "../../domain/Cart";
import {TransacRepository} from "../../domain/TransacRepository";


@Injectable()
export class MemoryService implements TransacRepository {
    private readonly memories: Cart[] = []

    save(cart: Cart): void {
        this.memories.push(cart)
    }

    findByReference(id: string): Cart {
        return this.memories.find(cart => cart.id === id);
    }

    findAll(): Cart[] {
        return this.memories.map(cart => cart)
    }

}
