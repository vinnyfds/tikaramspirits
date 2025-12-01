import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/CustomEase'
import { RoughEase, ExpoScaleEase, SlowMo } from 'gsap/EasePack'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'

// Register all GSAP plugins (useGSAP is a React hook, not a plugin)
gsap.registerPlugin(
  CustomEase,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  TextPlugin,
  SplitText
)

// Re-export commonly used items
export { gsap, useGSAP }
export { CustomEase, RoughEase, ExpoScaleEase, SlowMo }
export { ScrollTrigger, ScrollSmoother, ScrollToPlugin }
export { TextPlugin, SplitText }

