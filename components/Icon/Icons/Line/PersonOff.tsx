import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m20.71 16.465-3.37-3.38c.64.22 1.23.48 1.77.76.97.51 1.58 1.52 1.6 2.62Zm1.19 4.02-1.41 1.41-2.61-2.6H4.71v-2.78c0-1.12.61-2.15 1.61-2.66 1.29-.66 2.87-1.22 4.67-1.45L2.1 3.515l1.41-1.41 18.39 18.38Zm-6.02-3.19-3-3h-.17c-2.37 0-4.29.73-5.48 1.34-.32.16-.52.5-.52.88v.78h9.17Zm-3.17-12c1.1 0 2 .9 2 2 0 .86-.54 1.59-1.3 1.87l1.48 1.48a3.999 3.999 0 1 0-5.53-5.53l1.48 1.48a1.99 1.99 0 0 1 1.87-1.3Z" />
  </Svg>
)

export default Icon
