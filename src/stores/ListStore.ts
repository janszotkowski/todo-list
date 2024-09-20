import { makeObservable, observable } from 'mobx';
import { LoadingStore } from '@/stores/LoadingStore.ts';

export abstract class ListStore<L> extends LoadingStore {
    public data: L[] = [];

    public constructor() {
        super();

        makeObservable<ListStore<L>>(this, {
            data: observable,
        });
    }
}
