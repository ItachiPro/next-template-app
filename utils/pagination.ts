import { PaginatedResponse, Pagination, PaginationLinkResponse } from '@/types'

export const getPaginationData = <T>(
  pagination: PaginatedResponse<T>,
): Pagination => {
  return {
    from: pagination.from,
    to: pagination.to,
    total: pagination.total,
    links: pagination.links.map((link: PaginationLinkResponse) => ({
      label: link.label,
      page: link.page,
      active: link.active,
    })),
  }
}
