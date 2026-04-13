export enum FormAction {
  Create = 'create',
  Edit = 'edit',
}

export enum ToastType {
  Success = 'success',
  Error = 'error',
}

export type FormError = {
  field?: string[] | null
  message: string
}
