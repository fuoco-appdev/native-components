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
      d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10ZM9 14.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM13.75 13a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm3.75-5c-2.9 0-5.44-1.56-6.84-3.88.43-.07.88-.12 1.34-.12 2.9 0 5.44 1.56 6.84 3.88-.43.07-.88.12-1.34.12ZM4.42 9.47a8.046 8.046 0 0 0 3.66-4.44 8.046 8.046 0 0 0-3.66 4.44Zm15.25.29c.21.71.33 1.46.33 2.24 0 4.41-3.59 8-8 8s-8-3.59-8-8l.002-.05A.298.298 0 0 0 4 11.86c2.6-.98 4.69-2.99 5.74-5.55A10 10 0 0 0 17.5 10c.75 0 1.47-.09 2.17-.24Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
