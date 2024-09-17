import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6.74 3.285c1.12-.76 2.48-1.2 3.97-1.2 3.93 0 7 3.07 7 7 0 1.26-.38 2.65-1.07 3.9-.02.04-.05.08-.08.13l-1.48-1.48c.4-.86.63-1.75.63-2.55 0-2.8-2.2-5-5-5-.92 0-1.76.26-2.5.67l-1.47-1.47Zm11.18 11.18 1.43 1.43c1.47-1.88 2.36-4.24 2.36-6.81 0-3.04-1.23-5.79-3.22-7.78l-1.42 1.42a8.937 8.937 0 0 1 2.64 6.36c0 2.02-.67 3.88-1.79 5.38Zm-7.21-7.88c-.21 0-.4.03-.59.08l3.01 3.01c.05-.19.08-.38.08-.59a2.5 2.5 0 0 0-2.5-2.5Zm11.19 14.69L3.52 2.895 2.1 4.305l2.13 2.13c-.33.81-.52 1.7-.52 2.65h2c0-.36.05-.71.12-1.05l6.61 6.61c-.88.68-1.78 1.41-2.27 2.9-.5 1.5-1 2.01-1.71 2.38-.19.1-.46.16-.75.16-1.1 0-2-.9-2-2h-2a3.999 3.999 0 0 0 5.64 3.65c1.36-.71 2.13-1.73 2.73-3.55.32-.98.9-1.43 1.71-2.05.03-.02.05-.04.08-.06l6.62 6.62 1.41-1.42Z" />
  </Svg>
)

export default Icon
