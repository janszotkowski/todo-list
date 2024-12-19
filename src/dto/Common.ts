import { z } from 'zod';
import { DateTime } from 'luxon';
import { SVGProps } from 'react';

export enum Status {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    DELETED = 'DELETED',
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export enum LoadingState {
    LOADING,
    LOADED,
    UPDATING,
    UPDATED,
    INSERTING,
    INSERTED,
    DELETING,
    DELETED,
    FAILURE,
}

export enum ValidationEnum {
    SUCCESS,
    WARNING,
    VALIDATING,
    ERROR,
}

export type ValidationResult = {
    status: ValidationEnum;
    message: string;
};

export const LuxonDateSchema = z
    .string()
    .refine((val) => DateTime.fromISO(val).isValid, {message: 'Invalid date format'})
    .transform((val) => DateTime.fromISO(val).toUTC().toISO());

export type IconSvgProps = SVGProps<SVGSVGElement> & Partial<{
    size: number;
}>;

export type ColumnsData = {
    title: string;
    uid: string;
} & Partial<{
    sortable: boolean;
    align: 'start' | 'center' | 'end';
}>;