import { makeObservable, observable } from 'mobx';

export abstract class ListStore<L> {
    public data: L[] = [];

    public constructor() {
        makeObservable<ListStore<L>>(this, {
            data: observable,
        });
    }
}
