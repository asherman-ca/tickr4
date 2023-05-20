import React from 'react'
import { paginationRange } from './PaginationRange'
import { VscEllipsis } from 'react-icons/vsc'
import { HiChevronUp, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

type PaginationProps = {
	setRowsPerPage: any
	rowsPerPage: number
	rowsPerPageOptions: number[]
	totalCount: number
	setCurrentPage: any
	currentPage: number
	nextPage: any
	prevPage: any
}

const Pagination = ({
	setRowsPerPage,
	rowsPerPage,
	rowsPerPageOptions,
	totalCount,
	setCurrentPage,
	currentPage,
	nextPage,
	prevPage,
}: PaginationProps) => {
	const lastPage =
		totalCount % rowsPerPage === 0
			? totalCount / rowsPerPage
			: Math.floor(totalCount / rowsPerPage) + 1

	const paginationPages = paginationRange(currentPage, lastPage)

	const onSelect = (selectedValue: string) => {
		setRowsPerPage(selectedValue)
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<div className='flex items-center justify-between pt-4 px-2'>
			<div className='hidden md:flex basis-1/5'>
				<button
					className='top-button'
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						})
					}}
				>
					<HiChevronUp className='h-8 w-8' />
				</button>
			</div>
			<div className='basis-3/5 flex justify-center items-center gap-2'>
				<button
					// disabled={currentPage === 1}
					onClick={() => {
						prevPage()
					}}
					className={`${
						currentPage != 1
							? 'hover:bg-gray-200 cursor-pointer'
							: 'cursor-not-allowed'
					} p-2 rounded-md`}
				>
					<HiChevronLeft className='w-8 h-8' />
				</button>

				{paginationPages.map((pageNumber: number | string, ind: number) => {
					if (pageNumber === '...') {
						return (
							<div key={`ellipsis ${ind}`} className=''>
								<VscEllipsis className='w-8 h-8' />
							</div>
						)
					} else if (pageNumber === currentPage) {
						return (
							<button
								key={`button ${ind}`}
								className='px-4 py-2 rounded-md bg-gray-200'
							>
								{pageNumber}
							</button>
						)
					} else {
						return (
							<button
								key={`button ${ind}`}
								className='px-4 py-2 rounded-md hover:bg-gray-200'
								onClick={() => {
									setCurrentPage(pageNumber)
									window.scrollTo({
										top: 0,
										behavior: 'smooth',
									})
								}}
							>
								{pageNumber}
							</button>
						)
					}
				})}

				<button
					className={`${
						currentPage != lastPage
							? 'hover:bg-gray-200 cursor-pointer'
							: 'cursor-not-allowed'
					} p-2 rounded-md`}
					onClick={() => nextPage()}
				>
					<HiChevronRight className='h-8 w-8' />
				</button>
			</div>
			<div className='hidden md:flex basis-1/5 justify-end items-center gap-2'>
				<div>Show rows</div>
				<div className='bg-gray-100 rounded-md px-2'>
					<select
						name=''
						id=''
						value={rowsPerPage}
						onChange={(e) => {
							onSelect(e.target.value)
						}}
						className='bg-gray-100 py-1'
					>
						{rowsPerPageOptions.map((option) => (
							<option key={option}>{option}</option>
						))}
					</select>
				</div>
			</div>
		</div>
	)
}

export default Pagination
