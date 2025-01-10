'use client'

import { useRouter, useSearchParams } from 'next/navigation'

type PaginationProps = {
  currentPage: number
  lastPage: number
}

const PAGINATION_BUTTON_CLASSES =
  'border border-yellow-600 p-2 rounded-lg text-yellow-800 mx-4 min-w-10 text-center disabled:text-yellow-300 hover:bg-yellow-400'

export default function Pagination({ currentPage = 1, lastPage }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const newSearchParams = new URLSearchParams(searchParams.toString())
  //   newSearchParams.set('query', e.target.value)
  //   startTransition(() => router.push(`?${newSearchParams.toString()}`))
  // }
  // TODO Start transition needed?
  const handleClick = (type: 'prev' | 'next') => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    if (type === 'next') {
      newSearchParams.set('page', String(currentPage + 1))
    } else {
      if (currentPage !== 1) {
        newSearchParams.set('page', String(currentPage - 1))
      }
    }
    router.push(`?${newSearchParams.toString()}`)
  }

  return (
    <div className="flex place-content-center">
      <button className={PAGINATION_BUTTON_CLASSES} disabled={currentPage === 1} onClick={() => handleClick('prev')}>
        &larr;
      </button>
      <span className={PAGINATION_BUTTON_CLASSES}>{currentPage}</span>
      {
        <button
          className={PAGINATION_BUTTON_CLASSES}
          disabled={currentPage >= lastPage}
          onClick={() => handleClick('next')}
        >
          &rarr;
        </button>
      }
    </div>
  )
}
