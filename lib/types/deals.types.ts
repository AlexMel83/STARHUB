export interface IBaseFields {
    $createdAt: string
    $id: string
}

export interface ICustomer extends IBaseFields {
    name: string
    email: string
    avatar_url: string
    froum_source?: string
}

export interface IComment extends IBaseFields {
    text: string
}

export enum EnumStatus {
    'todo' = 'todo',
    'to-be-agreed' = 'to-be-agreed',
    'in-progress' = 'in-progress',
    'produced' = 'produced',
    'done' = 'done',
}

export interface IDeal extends IBaseFields {
    comments: IComment[]
    customers: ICustomer
    name: string
    price: number
    status: EnumStatus
}