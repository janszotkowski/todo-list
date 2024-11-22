import { action, makeObservable, observable } from 'mobx';
import { LoadingStore } from '@/stores/LoadingStore.ts';
import { ApiService } from '@/api/ApiService.ts';
import { LoadingState } from '@/dto/Common.ts';

export abstract class ListStore<L> extends LoadingStore {
    public data: L[] = [];

    public constructor() {
        super();

        makeObservable<ListStore<L>, any>(this, {
            data: observable,
            setData: action,
        });
    }

    protected abstract getService(): ApiService<L>;

    private setData(data: L[]): void {
        this.data = data;
    }

    public async loadData(): Promise<void> {
        this.setState(LoadingState.LOADING);

        try {
            const data = await this.getService().fetchAll() as L[];
            this.setData(data);
            this.setState(LoadingState.LOADED);
        } catch {
            this.setState(LoadingState.FAILURE);
        }
    }
}
