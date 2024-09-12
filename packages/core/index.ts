import { makeInstaller } from '@yugutou/comps-utils'
import components from './components'
import '@yugutou/comps-theme/index.css'

const installer = makeInstaller(components)

export * from '@yugutou/comps-components'
export default installer
