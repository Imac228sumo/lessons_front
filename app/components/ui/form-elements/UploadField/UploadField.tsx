import cn from 'classnames'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FC } from 'react'

import SkeletonLoader from '../../SkeletonLoader/SkeletonLoader'
import { IUploadField } from '../form.interface'
import styles from '../form.module.scss'

import { useUpload } from './useUpload'

const DynamicPlayer = dynamic(() => import('@/ui/video-player/VideoPlayer'), {
	ssr: false,
})

const UploadField: FC<IUploadField> = ({
	placeholder,
	error,
	style,
	value,
	folder,
	onChange,
	isImage = false,
	isVideo = false,
}) => {
	const { uploadFile, isLoading } = useUpload(onChange, folder)
	console.log(value)

	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input
						className={styles.uploadFile}
						type='file'
						id='file'
						onChange={uploadFile}
					/>
					{error && <div className={styles.error}>{error.message}</div>}
				</label>
				{isImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className={styles.loader} />
						) : (
							value && <Image src={value} alt='' fill unoptimized />
						)}
					</div>
				)}
				{isVideo && (
					<div className={styles.uploadVideoContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className={styles.loader} />
						) : (
							value && <DynamicPlayer videoSource={value} slug={value} />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
