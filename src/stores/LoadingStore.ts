import { action, makeObservable, observable } from 'mobx';
import { LoadingState } from '@/dto/Common.ts';

export abstract class LoadingStore {
    public loadingState?: LoadingState;

    protected constructor() {
        makeObservable<LoadingStore>(
            this, {
                loadingState: observable,
                setState: action,
                resetState: action,
            },
        );
    }

    public setState(state: LoadingState): void {
        this.loadingState = state;
    }

    public resetState(): void {
        this.loadingState = undefined;
    }
}
