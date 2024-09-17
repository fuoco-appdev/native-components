import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13.5 3a9 9 0 0 0-9 9h-3l3.89 3.89.07.14L9.5 12h-3c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13.5 21a9 9 0 0 0 0-18Zm-1 5v5l4.25 2.52.77-1.28L14 12.15V8h-1.5Z" />
  </Svg>
)

export default Icon
