import { ValidationStore } from '@/stores/ValidationStore.ts';
import { action, makeObservable, observable } from 'mobx';
import { debounce, DebouncedFunc } from 'lodash';
import { LoadingState } from '@/dto/Common.ts';
import { ApiService } from '@/api/ApiService.ts';
import { success } from '@/components/toast/toast.ts';

export abstract class InsertStore<I> extends ValidationStore<I> {
    public data: I = this.getInitData();
    protected readonly debounceValidation: DebouncedFunc<(dataIndex: string, data: I) => boolean>;

    protected constructor() {
        super();

        makeObservable<InsertStore<I>, any>(this, {
            data: observable,
            reset: action,
        });

        this.debounceValidation = debounce(this.validateValueAtIndex, 300);
    }

    protected abstract getInitData(): I;

    protected abstract getService(): ApiService<I>;

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
            await this.getService().create(this.data);
            this.setState(LoadingState.INSERTED);
            success('🦄 Wow so easy!');
            return true;
        } catch {
            this.setState(LoadingState.FAILURE);
            success('Fail!');
            return false;
        }
    }

    public reset(): void {
        this.data = this.getInitData();
        this.validationState.clear();
    }
}
