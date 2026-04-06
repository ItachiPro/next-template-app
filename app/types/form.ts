export enum FormAction {
  Create = 'create',
  Edit = 'edit',
}

export type FormError = {
  field?: string[] | null
  message: string
}
