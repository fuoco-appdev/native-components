import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.93 6 11v5l-2 2v1h16v-1l-2-2Zm-6 6c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2Zm-.3-8.8 2.8-3.4V8h-5v1.8h2.8l-2.8 3.4V15h5v-1.8h-2.8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
