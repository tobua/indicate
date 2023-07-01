const colors = {
  green: {
    light: '#59E28A',
    dark: '#1FC95B',
  },
  red: {
    light: '#FFAB91',
    dark: '#FF5722',
  },
  gray: {
    light: '#B0BEC5',
    dark: '#607D8B',
  },
}

const buttonStyle = (color: keyof typeof colors) => ({
  background: colors[color].light,
  marginLeft: 20,
  height: '100%',
  border: `2px solid ${colors[color].dark}`,
  borderRadius: 10,
  cursor: 'pointer',
  outline: 'none',
})

interface Props {
  color?: keyof typeof colors
}

export const Button = ({
  color = 'gray',
  children,
  ...props
}: Props &
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => (
  <button style={buttonStyle(color)} {...props}>
    {children}
  </button>
)
