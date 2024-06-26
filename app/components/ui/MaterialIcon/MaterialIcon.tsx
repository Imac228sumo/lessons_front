import cn from 'classnames'
import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { useRenderClient } from '@/hooks/useRenderClient'
import { TypeMaterialIconName } from '@/shared/types/icon.types'

const MaterialIcon: FC<{ name: TypeMaterialIconName; style?: string }> = ({
	name,
	style,
}) => {
	const { isRenderClient } = useRenderClient()
	const IconComponent = MaterialIcons[name] || MaterialIcons.MdDragIndicator

	if (isRenderClient)
		return <IconComponent className={cn(style ? style : '')} />
	else return null
}
export default MaterialIcon
