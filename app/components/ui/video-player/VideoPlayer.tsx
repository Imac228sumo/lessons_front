import cn from 'classnames'
import { FC } from 'react'

import MaterialIcon from '../MaterialIcon/MaterialIcon'

import AuthPlaceholder from './AuthPlaceholder/AuthPlaceholder'
import styles from './VideoPlayer.module.scss'
import { useVideo } from './useVideo'
import { IVideoPlayer } from './video.interface'
import { useAuth } from '@/hooks/useAuth'

const VideoPlayer: FC<IVideoPlayer> = ({ videoSource, slug }) => {
	const {
		actions,
		videoRef,
		playProgressBarRef,
		bufferProgressBarRef,
		progressTimeRef,
		timeLineRef,
		video,
	} = useVideo()
	const { user } = useAuth()

	return (
		<div
			className={cn(styles.wrapper, {
				[styles.noUser]: !user,
			})}
		>
			{user ? (
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={`${videoSource}#t=8`}
						preload='metadata'
						onClick={actions.toggleVideo}
					/>

					<div className={styles.controlsContainer}>
						<div className={styles.videoTimeline} ref={timeLineRef}>
							<div className={styles.progressArea}>
								<span ref={progressTimeRef} draggable={false}>
									00:00
								</span>

								<div
									ref={playProgressBarRef}
									className={styles.playProgressBar}
								></div>

								<div
									ref={bufferProgressBarRef}
									className={styles.bufferProgressBar}
								></div>
							</div>
						</div>

						<div className={styles.controls}>
							<div>
								<button onClick={actions.revert}>
									<MaterialIcon name='MdHistory' />
								</button>

								<button
									onClick={actions.toggleVideo}
									className={styles.playButton}
								>
									<MaterialIcon
										name={video.isPlaying ? 'MdPause' : 'MdPlayArrow'}
									/>
								</button>

								<button onClick={actions.forward}>
									<MaterialIcon name='MdUpdate' />
								</button>

								<div className={styles.timeControls} draggable={false}>
									<p className={styles.controlsTime}>
										{Math.floor(video.currentTime / 60) +
											':' +
											('0' + Math.floor(video.currentTime % 60)).slice(-2)}
									</p>
									<p> / </p>
									<p className={styles.controlsTime}>
										{Math.floor(video.videoDuration / 60) +
											':' +
											('0' + Math.floor(video.videoDuration % 60)).slice(-2)}
									</p>
								</div>
								{/* MdVolumeDown MdVolumeOff MdVolumeUp*/}
								<button className={styles.volume}>
									<MaterialIcon name='MdVolumeUp' />
								</button>
							</div>

							<div>
								<button onClick={actions.PictureInPicture}>
									<MaterialIcon
										name='MdPictureInPicture'
										style={styles.MdPictureInPicture}
									/>
								</button>
								{video.isFullScreen ? (
									<button onClick={actions.fullScreen}>
										<MaterialIcon name='MdFullscreenExit' />
									</button>
								) : (
									<button onClick={actions.fullScreen}>
										<MaterialIcon name='MdFullscreen' />
									</button>
								)}
							</div>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	)
}

// If you wanna add change quality buttons
//kmoskwiak.github.io/videojs-resolution-switcher/
//https://stackoverflow.com/questions/38626993/change-video-quality-with-sources-pointing-to-different-quality-versions

export default VideoPlayer
