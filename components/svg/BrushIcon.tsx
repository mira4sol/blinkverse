import { SVGProps } from 'react'

const BrushIcon = (props?: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M4.99652 9.1685C7.05553 6.7761 11.7192 2.10302 13.6925 2.0028C14.9133 1.88588 12.4812 6.21682 6.719 10.9558M7.63873 6.69644L9.1438 8.21644M2 13.9029C2.47299 12.2313 2.17458 13.0528 2.33605 11.1278C2.42204 10.8428 2.59505 9.9583 3.67572 9.5175C4.90412 9.01644 5.80465 9.7739 6.03741 10.1298C6.72313 10.8733 6.8026 11.7966 6.03741 12.8514C5.2722 13.9062 3.00235 14.1683 2 13.9029Z'
        stroke={props?.color || '#B7B7B7'}
        // stroke='#B28AE4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default BrushIcon
