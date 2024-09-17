import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.5 5.25c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm6.5 7v10.5h-1v-10.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1h-1v-.69a6.02 6.02 0 0 1-3.51-2.52c-.31.87-.49 1.78-.49 2.71 0 .23.02.46.03.69L14 16.25v6.5h-2v-5l-1.78-2.54-.22 3.54-3 4-1.6-1.2L8 18.08v-5.33c0-1.15.18-2.29.5-3.39l-1.5.85v3.54H5v-4.7l5.4-3.07v.01a2 2 0 0 1 1.94.03c.36.21.63.51.8.85l.79 1.67a3.987 3.987 0 0 0 3.57 2.21c.83 0 1.5.67 1.5 1.5Z" />
  </Svg>
)

export default Icon
