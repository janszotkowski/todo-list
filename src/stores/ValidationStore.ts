import { action, makeObservable, observable, remove, set } from 'mobx';
import { ValidationEnum, ValidationResult } from '@/dto/Common.ts';
import { LoadingStore } from '@/stores/LoadingStore.ts';
import { SafeParseReturnType, ZodIssue, ZodType } from 'zod';

export abstract class ValidationStore<T> extends LoadingStore {
    public validationState: Map<string, ValidationResult> = new Map<string, ValidationResult>();

    protected constructor() {
        super();

        makeObservable<ValidationStore<T>, any>(
            this, {
                validationState: observable,
                resetValidationState: action,
                setValidationErrors: action,
                setValidationError: action,
                removeValidationState: action,
            },
        );
    }

    protected abstract initValidationSchema(): ZodType<any, any, T>;

    protected validationSchema: ZodType<any, any, T> = this.initValidationSchema();

    public async validateData(data: T): Promise<boolean> {
        this.resetValidationState();
        const validationResult = await this.doValidateAll(data);

        if (!validationResult.success) {
            this.setValidationErrors(validationResult.error.errors);
            return false;
        }

        return true;
    }

    protected doValidateAll(data: T): Promise<SafeParseReturnType<T, any>> {
        return this.validationSchema.safeParseAsync(data);
    }

    public resetValidationState(): void {
        this.validationState = new Map<string, ValidationResult>();
    }

    private setValidationErrors(errors: ZodIssue[]): void {
        errors.forEach(error => {
            const key = error.path[ 0 ] as string;
            this.setValidationError(key, error.message);
        });
    }

    private setValidationError(dataIndex: string, message: string): void {
        set(this.validationState, dataIndex, {status: ValidationEnum.ERROR, message: message});
    }

    protected setDataValueAtIndex(data: T, dataIndex: string, value: any): void {
        const path = dataIndex.split('.');
        let valueIndex = dataIndex;
        let objInPath: any = data;

        if (path.length > 1) {
            valueIndex = path.pop()!;
            objInPath = path.reduce((o: any, i: string): void => o[ i ], data as any);
        }
        set(objInPath, valueIndex, value);
    }

    private removeValidationState(dataIndex: string): void {
        if (this.validationState.get(dataIndex)) {
            remove(this.validationState, dataIndex);
        }
    }

    protected validateValueAtIndex(dataIndex: string, data: T): boolean {
        const validationResult = this.doValidateValueAtIndex(dataIndex, data);

        if (!validationResult.success) {
            this.setValidationError(dataIndex, validationResult.error.errors[ 0 ].message);
            return false;
        }

        this.removeValidationState(dataIndex);
        return true;
    }

    protected doValidateValueAtIndex(dataIndex: string, data: T): SafeParseReturnType<T, any> {
        const value = (data as Record<string, any>)[dataIndex];
        return (this.validationSchema as any).pick({[ dataIndex ]: true}).safeParse({[ dataIndex ]: value});
    }
}
