import { SVGProps } from 'react'

const HamburgerMenuIcon = (props?: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M3.33301 4.16675H13.333'
        stroke='#B7B7B7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.33301 10H16.6663'
        stroke='#B7B7B7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.33301 15.8333H9.99967'
        stroke='#B7B7B7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default HamburgerMenuIcon
