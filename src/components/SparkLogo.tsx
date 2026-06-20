import logoGradient from '../assets/logo-gradient.png'
import logoLight from '../assets/logo-light.png'
import logoWhite from '../assets/logo-white.png'
import logoPurple from '../assets/logo-purple.png'

type Variant = 'gradient-dark' | 'dark-on-light' | 'white' | 'purple'

interface Props {
  size?: number
  variant?: Variant
  className?: string
}

const srcMap: Record<Variant, string> = {
  'gradient-dark': logoGradient,
  'dark-on-light': logoLight,
  'white': logoWhite,
  'purple': logoPurple,
}

export default function SparkLogo({ size = 32, variant = 'gradient-dark', className = '' }: Props) {
  const radius = Math.round(size * 0.22)

  return (
    <img
      src={srcMap[variant]}
      width={size}
      height={size}
      alt="SPARK"
      className={className}
      style={{ objectFit: 'cover', borderRadius: radius, display: 'block' }}
    />
  )
}
