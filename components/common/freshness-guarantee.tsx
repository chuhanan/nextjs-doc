import policyIcon from '~/assets/images/policy-icon.svg'
import Img from './img'

export default function FreshnessGuarantee(props) {
  const { title } = props
  return (
    <div className="inline-flex items-center mt-1 py-1 px-2.5 rounded-full bg-[#CCF2EC] text-[#005055]">
      <Img className="mr-0.5" src={policyIcon} alt="" />
      <span className="enki-badge-label-sm">{title}</span>
    </div>
  )
}
