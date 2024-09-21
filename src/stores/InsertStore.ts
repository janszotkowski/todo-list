import { ValidationStore } from '@/stores/ValidationStore.ts';
import { makeObservable, observable } from 'mobx';
import { debounce, DebouncedFunc } from 'lodash';
import { LoadingState } from '@/dto/Common.ts';

export abstract class InsertStore<I> extends ValidationStore<I> {
    public data: I = this.getInitData();
    protected readonly debounceValidation: DebouncedFunc<(dataIndex: string, data: I) => boolean>;

    protected constructor() {
        super();

        makeObservable<InsertStore<I>, any>(this, {
            data: observable,
        });

        this.debounceValidation = debounce(this.validateValueAtIndex, 300);
    }

    protected abstract getInitData(): I;

    public onInputChange(dataIndex: string, value: any): void {
        this.setDataValueAtIndex(this.data, dataIndex, value);
        this.debounceValidation(dataIndex, this.data);
    }

    public async validate(): Promise<boolean> {
        return await this.validateData(this.data);
    }

    public async onInsert(): Promise<boolean> {
        const valid = await this.validate();

        if (!valid) {
            return false;
        }

        this.setState(LoadingState.INSERTING);

        try {
            this.setState(LoadingState.INSERTED);
            return true;
        } catch {
            this.setState(LoadingState.FAILURE);
            return false;
        }
    }
}
